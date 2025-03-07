import React, { useEffect, useState } from "react";
import {getQuantity, updateStock} from "../../../../services/products.js";
import { MdOutlineGasMeter } from "react-icons/md";
import InputForm from "../../molecules/InputForm.jsx";
import Button from "../../atoms/Button.jsx";

const StockProduct = () => {
  const [count, setCount] = useState({
    currentQuantity: 0,
    quantityWeekly: 0,
    quantityMonthly: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getQuantity("1", (message, res) => {
          setCount(
            res.data || {
              currentQuantity: 0,
              quantityWeekly: 0,
              quantityMonthly: 0,
            }
          );
        });
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      quantity: e.target.stock.value
    }

    updateStock(data,(status, data) => {
      if (status === 200) {
        window.location.reload();
      } else {
        console.log(data);
      }
    })
  }

  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-2 p-2">
      <div onClick={() => setModal(true)} className="flex justify-start items-center gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 min-w-[250px]">
        <MdOutlineGasMeter className="text-4xl bg-[#000836] h-full w-1/4 p-2 text-white rounded " />
        <div>
          <p>Stok Tersedia</p>
          <p className="font-bold text-3xl">{count.currentQuantity}</p>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 min-w-[250px]">
        <MdOutlineGasMeter className="text-4xl bg-[#000836] h-full w-1/4 p-2 text-white rounded " />
        <div>
          <p>Penjualan Minggu Ini</p>
          <p className="font-bold text-3xl">{count.quantityWeekly}</p>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 min-w-[250px]">
        <MdOutlineGasMeter className="text-4xl bg-[#000836] h-full w-1/4 p-2 text-white rounded " />
        <div>
          <p>Penjualan Bulan Ini</p>
          <p className="font-bold text-3xl">{count.quantityMonthly}</p>
        </div>
      </div>

      {modal && (
          <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">Edit Stok</h3>
                <button
                    onClick={() => setModal(false)}
                    className="text-gray-400 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4">
                <InputForm label="Stok Produk" id="stock" type="text" value={count.currentQuantity} />
                <Button type="submit" size="w-full">Edit</Button>
              </form>

            </div>
          </div>
      )}
    </div>
  );
};

export default StockProduct;
