import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getCostumers } from "../../../../services/customer.js";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import Form from "./Form.jsx";

const columnHelper = createColumnHelper();

const Table = ({ type }) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const columns = [
    columnHelper.accessor("userId", {
      header: () => (type === "Customer" ? "NIK" : "No. Agen"),
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("fullname", {
      header: () => "Nama",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("address", {
      header: () => "Alamat",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("category", {
      header: () => "Kategori",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("price", {
      header: () => "Harga",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("userId", {
      header: () => "",
      cell: (info) => (
        <button
          onClick={() => {
            setSelectedCustomer(info.row.original);
            setIsFormOpen(true);
          }}
          className="text-center block bg-[#56E39F] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Edit
        </button>
      ),
    }),
  ];

  const fetchData = async (page = 1, searchQuery = "") => {
    getCostumers(type, page, 10, searchQuery, (status, res) => {
      if (status === 200) {
        setCustomers(res.data);
        setTotalPages(res.meta.totalPages);
      }
    });
  };

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 300); // Wait 300ms after the user stops typing

  useEffect(() => {
    fetchData(currentPage, search);
  }, [currentPage, search]);

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => debouncedSearch(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <table className="w-full mt-4">
        <thead className="text-gray-700 uppercase bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3">
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
            <tr key={row.id} className="bg-white border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isFormOpen && (
        <Form
          type={type}
          modal={isFormOpen}
          setModal={setIsFormOpen}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Table;
