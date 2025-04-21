import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
  Button,
  Label,
  TextInput,
  Radio,
  Select,
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

const SAMEPLE_OPTIONS_FOR_FILTER_DATE = [
  'Last day',
  'Last 7 days',
  'Last 30 days',
  'Last month',
  'Last year',
];
const SAMEPLE_OPTIONS_FOR_CATEGORY = [
  '493 - Travel - National',
  '760 - Motor Vehicles',
  '325 - Direct Expense',
];
export function ReceiptTable() {
  return (
    <div className="relative overflow-x-auto shadow-lg rounded-xl border-2 border-gray-100">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <div className="relative">
          {/* TODO: handle select option  */}
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() =>
              document
                .getElementById('dropdownRadio')
                ?.classList.toggle('hidden')
            }
          >
            {/* SVG: Clock */}
            <svg
              className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
            </svg>
            Date
            {/* SVG: Arrow down */}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            //  FIXME: not reliable when use "mt-[30%] to separate dropdown menu and button"
            id="dropdownRadio"
            className="z-10 hidden w-48 bg-white  rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 mt-[50%]"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
              position: 'absolute',
              inset: '0px auto auto 0px',
            }}
          >
            <ul
              className="p-3 space-y-1 text-sm divide-y divide-gray-200 text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              {SAMEPLE_OPTIONS_FOR_FILTER_DATE.map((option, index) => (
                <li key={option}>
                  <div className="flex items-center gap-2 p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Radio
                      id={`filter-radio-example-${index}`}
                      value={option}
                      name="filter-radio"
                    />
                    <Label htmlFor={`filter-radio-example-${index}`}>
                      {option}
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <TextInput
          id="table-search"
          className="block py-2 ps-10"
          rightIcon={() => (
            // SVG: Search
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
          placeholder="Search for items"
        />
      </div>

      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">
              <Checkbox />
            </TableHeadCell>

            {SAMPLE_FIELDS.map((field) => (
              <TableHeadCell key={field}>
                <div className="flex items-center">
                  {field}
                  <a href="#">
                    {/* SVG: Arrow Pairs Sorting */}
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="hsl(0 0 80)"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </TableHeadCell>
            ))}
            <TableHeadCell>
              <span className="sr-only">{ACTION_FIELD}</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y divide-gray-200">
          {SAMPLE_DATA_POINTS.map((dataPoint, rowIndex) => (
            <TableRow key={dataPoint.id}>
              <TableCell className="p-4">
                <Checkbox />
              </TableCell>

              <TableCell className="whitespace-nowrap">
                <Badge
                  className="w-fit"
                  color={
                    { Ready: 'success', 'To Review': 'warning' }[
                      dataPoint.status
                    ] || 'gray'
                  }
                >
                  {dataPoint.status}
                </Badge>
              </TableCell>

              <TableCell>
                {new Intl.DateTimeFormat('en-UK', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).format(dataPoint.date)}
              </TableCell>

              <TableCell>{dataPoint.supplier}</TableCell>

              <TableCell>
                {/* TODO: add handle click */}
                {/* TODO: add overflow-ellipsis to separate text from button icon */}
                <div className="max-w-md">
                  <Label htmlFor="category" className="sr-only">
                    Change category
                  </Label>
                  <Select
                    id="category"
                    defaultValue={
                      SAMEPLE_OPTIONS_FOR_CATEGORY[rowIndex] ??
                      SAMEPLE_OPTIONS_FOR_CATEGORY[0]
                    }
                  >
                    {SAMEPLE_OPTIONS_FOR_CATEGORY.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </Select>
                </div>
              </TableCell>

              <TableCell>
                {dataPoint.currency + ' ' + dataPoint.total.toFixed(2)}
              </TableCell>

              <TableCell>{dataPoint.note}</TableCell>

              <TableCell className="whitespace-nowrap">
                <Button color="cyan" outline size="xs" className="rounded-sm ">
                  {dataPoint.action}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
