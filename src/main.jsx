import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./pages/Login.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Transaction from "./pages/admin/Transaction.jsx";
import Agents from "./pages/admin/Agents.jsx";
import Customers from "./pages/admin/Customers.jsx";
import History from "./pages/admin/History.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />

              <Route path="admin" element={<AuthLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="transaction" element={<Transaction />} />
                  <Route path="history" element={<History />} />
                  <Route path="agents" element={<Agents />} />
                  <Route path="consuments" element={<Customers />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
