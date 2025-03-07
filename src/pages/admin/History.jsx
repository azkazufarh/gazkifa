import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getAllTransaction, getDate } from "../../../services/transactions.js";
import debounce from "lodash.debounce";
import Button from "../../components/atoms/Button.jsx";
import Invoices from "../../components/molecules/Invoices.jsx";

const columnHelper = createColumnHelper();

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [dates, setDates] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // New state for selected date
  const [selectedType, setSelectedType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const columns = [
    columnHelper.accessor("NIK", {
      header: "NIK",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("customerName", {
      header: "Nama",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transactionDate", {
      header: "Tanggal",
      cell: (info) => info.getValue().split(" ")[0],
    }),
    columnHelper.accessor("transactionCategory", {
      header: "Kategori",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transactionQuantity", {
      header: "Jumlah Gas",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transactionPrice", {
      header: "Harga",
      cell: (info) => `Rp ${info.getValue()}`,
    }),
    columnHelper.accessor("transactionTotal", {
      header: "Total Harga",
      cell: (info) => `Rp ${info.getValue()}`,
    }),

    columnHelper.accessor("NIK", {
      header: () => "",
      cell: (info) => (
        <Button
          type="button"
          onclick={() =>
            setSelectedInvoice({
              id: info.getValue(),
              qty: info.row.original.transactionQuantity,
              price: info.row.original.transactionPrice,
              date: info.row.original.createdAt,
            })
          }
        >
          Invoice
        </Button>
      ),
    }),
  ];

  const fetchTransactions = async () => {
    getAllTransaction(
      page,
      pageSize,
      searchQuery,
      selectedType,
      selectedDate,
      (res) => {
        if (res) {
          setTransactions(res.data);
          setTotalRecords(res.meta.totalRecords);
        }
      }
    );
  };

  const fetchData = () => {
    getDate((res) => {
      console.log(res.data);
      setDates(res.data);
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setPage(1);
  };

  const handleTypeChange = (event) => {
    console.log(event.target.value);
    setSelectedType(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetchTransactions();
    fetchData();
  }, [page, pageSize, searchQuery, selectedDate, selectedType]);

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const table = useReactTable({
    data: transactions,
    columns,
    pageCount: Math.ceil(totalRecords / pageSize),
    state: { pageIndex: page - 1 },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Helmet>
        <title>History</title>
      </Helmet>
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
        <div className="w-full flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2.5"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <select
              value={selectedDate}
              onChange={handleDateChange}
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Date</option>
              {dates.length > 0 &&
                dates.map((date, index) => (
                  <option key={index} value={date.date}>
                    {date.date}
                  </option>
                ))}
            </select>
            <select
              onChange={handleTypeChange}
              value={selectedType}
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Type
              </option>
              <option value="IN">Agen</option>
              <option value="OUT">Pelanggan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="w-full bg-gray-100 border-b border-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border-b border-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil(totalRecords / pageSize)}
          </span>
          <button
            disabled={page === Math.ceil(totalRecords / pageSize)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {selectedInvoice && (
        <Invoices
          id={selectedInvoice.id}
          qty={selectedInvoice.qty}
          price={selectedInvoice.price}
          date={selectedInvoice.date}
          onClose={() => setSelectedInvoice(false)}
        />
      )}
    </>
  );
};

export default History;
