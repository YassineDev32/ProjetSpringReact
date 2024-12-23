// UserLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer";

const UserLayout = ({ allowedRoles }) => {
  return (
    <div className="user-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
