import { Injectable } from '@nestjs/common';
import { parse } from 'csv/sync';
import { sampleBase64FromImage } from 'src/sampleData';

@Injectable()
export class BillsService {
  async getBills() {
    const data = await callToClaude({
      base64FromImage: sampleBase64FromImage.data,
      guidePrompt:
        'analyse this vietnamese receipt for grocery. then output csv format with fields: item_name|quantity|unit_price|total_price. Output csv only, no explanation',
    });

    console.dir({ data: data.content });

    const csvString = data.content[0].text;
    return { data: convertCSVtoArray(csvString) };
  }
}

function convertCSVtoArray(csvString) {
  return parse(csvString, {
    delimiter: '|',
  });
}

async function callToClaude({ base64FromImage, guidePrompt }) {
  const reqData = {
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
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
            text: guidePrompt,
          },
        ],
      },
    ],
  };

  if (!process.env.ANTHROPIC_API_KEY)
    throw new Error('Not found ANTHROPIC api key ');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POSt',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(reqData),
  });

  const data = await res.json();
  return data;
}
