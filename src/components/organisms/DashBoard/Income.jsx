import React, { useEffect, useState } from "react";
import { getMonthlyIncome } from "../../../../services/transactions.js";
import { map } from "lodash";
import IncomeCard from "../../molecules/IncomeCard.jsx";

const Income = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    getMonthlyIncome((res) => {
      setIncomes(res.data);
    });
  }, []);

  return (
    <div className="mt-4 flex overflow-x-auto whitespace-nowrap gap-2 p-2">
      <IncomeCard title="Total Penjualan" amount={incomes.totalIncome} />
      <IncomeCard title="Total Pembelian" amount={incomes.totalExpenses} />
      <IncomeCard title="Penghasilan Bersih" amount={incomes.totalNett} />
    </div>
  );
};
export default Income;
