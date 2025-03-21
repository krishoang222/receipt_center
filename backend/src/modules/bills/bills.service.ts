import { BadGatewayException, Injectable } from '@nestjs/common';
import { parse } from 'csv/sync';
import { BillItem, PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

const prisma = new PrismaClient();

type ParseItemType = Pick<BillItem, 'itemName' | 'quantity' | 'unitPrice'>;
type JSONResponseFromClaude = {
  // TODO: make use schema model Bill from db
  merchantName?: string;
  address?: string;
  dateOfBill: string;
  wifiName?: string;
  wifiPassword?: string;
  currency?: string;
  billItems: string;
  billTotalPrice?: string;
  tax?: string;
};

@Injectable()
export class BillsService {
  async addBill(base64FromImage: string) {
    try {
      // 1. call AI to scan bill and output json + csv
      const data = await callClaudeToGetJSONFromImage({
        base64FromImage,
        guidePrompt: `You will be analyzing an image of a receipt and extracting specific data from it. The image of the receipt is provided below:\n\n\nYour task is to carefully examine the image and extract the following information:\n\n1. merchantName (string): The name of the merchant or business\n2. address (string): The full address of the merchant\n3. dateOfBill (string): The date of the transaction\n4. wifiName (string or null): The Wi-Fi name if provided on the receipt\n5. wifiPassword (string or null): The Wi-Fi password if provided on the receipt\n6. currency (string): The currency used in the transaction (e.g., VND, USD)\n7. billItems (csvString): A list of items purchased, their quantities, and prices\n8. billTotalPrice (string): The total price of the bill\n9. tax (string): The tax amount\n\nImportant instructions:\n- If any field is not found in the receipt image, use null as the value. Do not make up or infer any information that is not explicitly present in the image.\n- For the billItems field, create a CSV string with the format \"itemName|quantity|totalPrice\" for each item. Use \"|\" as the delimiter between fields and \"\\n\" to separate each item. For example: \"Item1|2|10\\nItem2|1|5\"\n\nAfter analyzing the image, provide your extracted data in the following JSON format:\n\n<extracted_data>\n{\n  \"merchantName\",\n  \"address\",\n  \"dateOfBill\",\n  \"wifiName\",\n  \"wifiPassword\",\n  \"currency\",\n  \"billItems\",\n  \"billTotalPrice\",\n  \"tax\"\n}\n</extracted_data>\n\nRemember to use null for any fields that are not found in the receipt image, and do not invent or assume any information. Provide only the json data that you can clearly extract from the given image, don't add any explanation.`,
      });

      const billItemsArray = parseCSVBillItemsToArrayObject(data.billItems);

      const bill = await prisma.bill.create({
        data: {
          billDate: data.dateOfBill,
          merchantName: data.merchantName,
          address: data.address,
          wifiSSID: data.wifiName,
          wifiPassword: data.wifiPassword,
          totalPrice: data.billTotalPrice,
          taxAmount: data.tax,
          currency: data.currency,
          billItems: {
            createMany: {
              data: billItemsArray,
            },
          },
        },
        include: {
          billItems: {
            omit: {
              billId: true,
            },
          },
        },
      });

      return { data: bill };
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}

function parseCSVBillItemsToArrayObject(csvString: string) {
  // purpose: in order to createMany in db

  // (!) careful as the header from AI must match with field name in database -> I decide handle the order of csv response here to ensure match with database's field
  // (!) assumption: csvString's first column not header -> only contain data
  const arrayFromCSV = parse(csvString, { delimiter: '|' });

  // map item's column with header base on order
  const headerCSV = ['itemName', 'quantity', 'unitPrice'];

  const arrayParsedItems: ParseItemType[] = arrayFromCSV.map((row) => {
    return {
      [headerCSV[0]]: row[0],
      [headerCSV[1]]: row[1],
      [headerCSV[2]]: row[2],
    };
  });

  return arrayParsedItems;
}

async function callClaudeToGetJSONFromImage({
  base64FromImage,
  guidePrompt,
}: {
  base64FromImage: string;
  guidePrompt: string;
}): Promise<JSONResponseFromClaude> {
  if (!process.env.ANTHROPIC_API_KEY)
    throw new Error('Not found ANTHROPIC api key ');

  const reqData = {
    model: 'claude-3-haiku-20240307',
    max_tokens: 2000,
    temperature: 0.1,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: '<image_receipt>',
          },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: base64FromImage,
            },
          },
          {
            type: 'text',
            text: '</image_receipt>\n',
          },
          {
            type: 'text',
            text: guidePrompt,
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: 'json: {',
          },
        ],
      },
    ],
  };

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(reqData),
  });
  const data = await res.json();

  if (!res.ok) throw data;

  // append "{" to match json output from AI
  const result = JSON.parse('{' + data.content[0].text);

  // log response from claude
  fs.writeFileSync(
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'sampleData',
      'logs',
      `ai-response_${new Date().toISOString()}.json`,
    ),
    JSON.stringify(result),
    { flag: 'w' },
  );

  return result;
}
