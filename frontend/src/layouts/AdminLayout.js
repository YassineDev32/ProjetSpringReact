// AdminLayout.js
import React from "react";
import Dashboard from "../pages/Dashboard";

const AdminLayout = ({ allowedRoles }) => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};  

export default AdminLayout;