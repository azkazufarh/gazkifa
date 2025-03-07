import { useState } from "react";
import { Helmet } from "react-helmet";
import SelectForm from "../../components/molecules/SelectForm.jsx";
import FormTransaction from "../../components/organisms/FormTransaction.jsx";

const Transaction = () => {
  const [category, setCategory] = useState("default");

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Transaction</title>
      </Helmet>
      <div className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* <Invoices id={32031007040303} qty={5} price={20000} /> */}

        <div className="w-full md:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="font-bold text-3xl mb-2">Rekap Transaksi Anda</h1>
          <SelectForm
            id="category"
            label="Pilih Kategori"
            onChange={handleCategory}
          >
            <option value="default">Pilih Kategori</option>
            <option value="Penjualan Gas">Penjualan Gas</option>
            <option value="Penjualan Tabung">Penjualan Tabung</option>
            <option value="Pembelian Gas">Pembelian Gas</option>
          </SelectForm>
          <FormTransaction value={category} />
        </div>
      </div>
    </>
  );
};

export default Transaction;
