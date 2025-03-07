import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/organisms/Sidebar";

const AuthLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
