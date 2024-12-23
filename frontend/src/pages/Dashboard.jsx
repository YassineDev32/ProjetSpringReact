import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import TopNav from "../components/Dashboard/TopNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar className="w-[260px] fixed top-0 left-0 h-full bg-gray-800 shadow-lg" />

      {/* Main Layout */}
      <div className="flex-1 ml-[260px] flex flex-col">
        {/* Top Navigation */}
        <TopNav className="h-[60px] bg-gray-800 shadow-md" />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
