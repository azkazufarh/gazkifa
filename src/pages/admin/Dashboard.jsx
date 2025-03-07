import { Helmet } from "react-helmet";
import MonthlySalesTable from "../../components/organisms/DashBoard/MonthlySalesTable.jsx";
import StockProduct from "../../components/organisms/DashBoard/StockProduct.jsx";
import Income from "../../components/organisms/DashBoard/Income.jsx";

const Dashboard = () => {
  return (
    <div className="p-4">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* Stok Barang */}
      <StockProduct />

      {/* Pendapatan */}
      <Income />

      {/* Dashboard */}
      <div className="flex gap-2 flex-col md:flex-row mt-4">
        <MonthlySalesTable
          type="IN"
          title="Transaksi Pembelian Gas 30 Hari Terakhir"
        />
        <MonthlySalesTable
          type="OUT"
          title="Transaksi Penjualan Gas 30 Hari Terakhir"
        />
      </div>
    </div>
  );
};

export default Dashboard;
