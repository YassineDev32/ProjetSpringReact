import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import SellCar from "./pages/SellCar";
import Settings from "./pages/Settings";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/bookings" element={<Bookings />} />
      <Route path="/admin/sell-car" element={<SellCar />} />
      <Route path="/admin/settings" element={<Settings />} />
    </Routes>
  );
};

export default Router;
