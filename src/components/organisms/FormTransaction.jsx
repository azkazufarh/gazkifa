import { useState } from "react";
import InputForm from "../molecules/InputForm.jsx";
import Button from "../atoms/Button.jsx";
import Label from "../atoms/Label.jsx";
import { getCostumers } from "../../../services/customer.js";
import { addTransaction } from "../../../services/transactions.js";
import Invoices from "../molecules/Invoices.jsx";

const FormTransaction = (props) => {
  const { value } = props;
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ price: 0 });
  const [invoice, setInvoice] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // Fetch customer data
  const fetchData = async (searchQuery) => {
    getCostumers(
      value === "Pembelian Gas" ? "Agen" : "Customer",
      undefined,
      undefined,
      searchQuery,
      (status, res) => {
        if (status === 200) {
          console.log(res.data);
          setOptions(res.data || []);
        } else {
          console.error("Failed to fetch customers:", res.message);
        }
      }
    );
  };

  const handleOptionChange = (event) => {
    const nik = event.target.value;
    fetchData(nik);
    const option = options.find(
      (opt) => String(opt.userId) === nik.split(" ")[0]
    );

    console.log(option);

    setSelectedOption(option || { price: 0 });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const category = value;
    setQuantity(event.target.total.value);

    const data = {
      userId: event.target.nik.value.split(" ")[0],
      productId: 1,
      type: category === "Pembelian Gas" ? "IN" : "OUT",
      quantity: event.target.total.value,
      price: event.target.price.value,
      category,
      createdAt: event.target.date.value,
      updatedAt: event.target.date.value,
    };

    addTransaction(data, (status, res) => {
      if (status === 201) {
        console.log(res);
        setInvoice(true);
      } else {
        alert("Transaksi gagal ditambahkan");
      }
    });
  };

  if (value === "Penjualan Gas" || value === "Penjualan Tabung") {
    return (
      <>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className="flex flex-col mb-2">
            <Label htmlFor="nik">NIK</Label>
            <input
              type="text"
              id="nik"
              name="nik"
              className="border border-[#5A6674] rounded-lg py-2 px-4"
              list="nik-options"
              onChange={handleOptionChange}
            />
            {options.length > 0 && (
              <datalist id="nik-options">
                {options.map((option) => (
                  <option
                    key={option.userId}
                    value={`${option.userId} - ${option.fullname}`}
                  >
                    {`${option.userId} - ${option.fullname}`}
                  </option>
                ))}
              </datalist>
            )}
          </div>
          <InputForm
            id="price"
            type="number"
            label="Harga Pertabung"
            placeholder="0"
            value={selectedOption.price || ""}
            readOnly
          />
          <InputForm
            id="total"
            type="number"
            label="Jumlah Gas"
            placeholder="0"
          />

          <InputForm
            id="date"
            type="date"
            label="Tanggal"
            value={new Date().toISOString().split("T")[0]}
          />

          <Button type="submit" id="btnTransaction" size="w-full">
            Submit
          </Button>
        </form>

        {invoice && (
          <Invoices
            id={selectedOption.userId}
            qty={quantity}
            price={selectedOption.price}
          />
        )}
      </>
    );
  } else if (value === "Pembelian Gas") {
    return (
      <>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col mb-2">
            <Label htmlFor="nik">Agen Gas</Label>
            <input
              type="text"
              id="nik"
              name="nik"
              className="border border-[#5A6674] rounded-full py-2 px-4"
              list="nik-options"
              onChange={handleOptionChange}
            />
            {options.length > 0 && (
              <datalist id="nik-options">
                {options.map((option) => (
                  <option
                    key={option.userId}
                    value={`${option.userId} - ${option.fullname}`}
                  >
                    {`${option.userId} - ${option.fullname}`}
                  </option>
                ))}
              </datalist>
            )}
          </div>
          <InputForm
            id="price"
            type="number"
            label="Harga Pertabung"
            value={selectedOption.price || ""}
            placeholder="0"
          />
          <InputForm
            id="total"
            type="number"
            label="Jumlah Gas"
            placeholder="0"
          />
          <InputForm
            id="date"
            type="date"
            label="Tanggal"
            value={new Date().toISOString().split("T")[0]}
          />
          <Button type="submit" id="btnTransaction" size="w-full">
            Submit
          </Button>
        </form>

        {invoice && (
          <Invoices
            id={selectedOption.userId}
            qty={quantity}
            price={selectedOption.price}
          />
        )}
      </>
    );
  } else {
    return (
      <p className="text-gray-500 mt-4">
        Silakan pilih kategori untuk memulai.
      </p>
    );
  }
};

export default FormTransaction;
