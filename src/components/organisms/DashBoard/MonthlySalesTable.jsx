import { useEffect, useState } from "react";
import { getMonthlyHistory } from "../../../../services/transactions.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySalesTable = (props) => {
  const { type, title } = props;
  const [transactions, setTransactions] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    getMonthlyHistory("1", type, (res) => {
      const fetchedTransactions = res.data.data.transactions;
      setTransactions(fetchedTransactions);
    });
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const labels = transactions.map(
        (transaction) => transaction.transactionDate
      );
      const data = transactions.map((transaction) => transaction.totalQuantity);

      setChart({
        labels,
        datasets: [
          {
            label: "Total Gas",
            data,
            backgroundColor:
              type === "IN" ? "rgba(75, 192, 192, 0.5" : "rgba(55,255,91,0.5)",
            borderColor:
              type === "IN" ? "rgba(75, 192, 192, 1)" : "rgba(0,255,25,1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="w-full md:w-1/2 md:h-96">
      {chart ? <Bar data={chart} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default MonthlySalesTable;
