import { useRef } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom"; // useLocation for route detection
import Button from "../atoms/Button";
import { IoIosMenu } from "react-icons/io";

const Sidebar = () => {
  const location = useLocation(); // Get the current route
  const mobileToggle = useRef(null);

  const handleMobileMenu = () => {
    mobileToggle.current.classList.toggle("hidden");
  };

  return (
    <div className="sticky top-0 w-full md:w-1/5 md:h-screen bg-[#000836] p-4 z-9">
      <div className="flex justify-between items-center md:hidden">
        <p className="text-white text-2xl font-bold">Gazkifa</p>
        <Button type="button" onclick={handleMobileMenu}>
          <IoIosMenu size={36} />
        </Button>
      </div>
      <div ref={mobileToggle} className="hidden md:block p-2">
        <Link
          to="/admin/dashboard"
          className={`flex items-center ${
            location.pathname === "/admin/dashboard" && "bg-[#56E39F] font-bold"
          } h-fit w-full p-2 rounded mb-4`}
        >
          <MdSpaceDashboard size={36} className="text-white" />
          <p className="text-white ms-2 transition-all duration-300">
            Dashboard
          </p>
        </Link>
        <Link
          to="/admin/transaction"
          className={`flex items-center ${
            location.pathname === "/admin/transaction" &&
            "bg-[#56E39F] font-bold"
          } h-fit w-full p-2 rounded mb-4`}
        >
          <MdSpaceDashboard size={36} className="text-white" />
          <p className="text-white ms-2 transition-all duration-300">
            Transaction
          </p>
        </Link>
        <Link
          to="/admin/history"
          className={`flex items-center ${
            location.pathname === "/admin/history" && "bg-[#56E39F] font-bold"
          } h-fit w-full p-2 rounded mb-4`}
        >
          <MdSpaceDashboard size={36} className="text-white" />
          <p className="text-white ms-2 transition-all duration-300">History</p>
        </Link>
        <Link
          to="/admin/consuments"
          className={`flex items-center ${
            location.pathname === "/admin/consuments" &&
            "bg-[#56E39F] font-bold"
          } h-fit w-full p-2 rounded mb-4`}
        >
          <MdSpaceDashboard size={36} className="text-white" />
          <p className="text-white ms-2 transition-all duration-300">
            Daftar Pelanggan
          </p>
        </Link>
        <Link
          to="/admin/agents"
          className={`flex items-center ${
            location.pathname === "/admin/agents" && "bg-[#56E39F] font-bold"
          } h-fit w-full p-2 rounded mb-4`}
        >
          <MdSpaceDashboard size={36} className="text-white" />
          <p className="text-white ms-2 transition-all duration-300">
            Daftar Agen
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
