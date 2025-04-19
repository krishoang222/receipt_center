import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';

const SAMPLE_FIELDS = [
  'Status',
  'Date',
  'Supplier',
  'Category',
  'Total',
  'Note / Message',
];

const ACTION_FIELD = 'Action';
const SAMPLE_DATA_POINTS = [
  {
    id: 1,
    status: 'Ready',
    supplier: 'Starbucks',
    category: '493 - Travel - National',
    date: new Date(2025, 4, 19),
    total: 4.9,
    note: 'message',
    action: 'Publish',
    currency: 'USD',
  },
  {
    id: 2,
    status: 'Ready',
    supplier: 'Mileage',
    category: '493 - Travel - National',
    total: 28.75,
    date: new Date(2025, 1, 10),
    note: 'message',
    action: 'Publish',
    currency: 'USD',
  },
  {
    id: 3,
    status: 'To Review',
    supplier: 'UK Railways',
    category: '493 - Travel - National',
    total: 118.7,
    date: new Date(2024, 12, 10),
    note: 'message',
    action: 'Publish',
    currency: 'USD',
  },
  {
    id: 4,
    status: 'Ready',
    supplier: 'Tradesync',
    category: '760 - Motor Vehicles',
    total: 62.4,
    date: new Date(2024, 12, 10),
    note: 'message',
    action: 'Request approval',
    currency: 'USD',
  },
  {
    id: 5,
    status: 'To Review',
    supplier: 'Car Park',
    category: '325 - Direct Expense',
    total: 20,
    date: new Date(2024, 7, 9),
    note: 'message',
    action: 'Publish',
    currency: 'USD',
  },
];

export function ReceiptTable() {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">
              <Checkbox />
            </TableHeadCell>

            {SAMPLE_FIELDS.map((field) => (
              <TableHeadCell key={field}>{field}</TableHeadCell>
            ))}
            <TableHeadCell>
              <span className="sr-only">{ACTION_FIELD}</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {SAMPLE_DATA_POINTS.map((dataPoint) => (
            <TableRow key={dataPoint.id}>
              <TableCell className="p-4">
                <Checkbox />
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {dataPoint.status}
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat('en-UK', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).format(dataPoint.date)}
              </TableCell>
              <TableCell>{dataPoint.supplier}</TableCell>
              <TableCell>{dataPoint.category}</TableCell>
              <TableCell>
                {dataPoint.currency + ' ' + dataPoint.total.toFixed(2)}
              </TableCell>
              <TableCell>{dataPoint.note}</TableCell>
              <TableCell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  {dataPoint.action}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
