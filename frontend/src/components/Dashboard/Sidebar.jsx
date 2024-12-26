import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  };

  return (
    <div
      className="w-[260px] h-full fixed top-0 left-0 z-[999] p-6"
      style={{ backgroundColor: "#181b3a" }} // Primary color
    >
      {/* Sidebar Top */}
      <div className="w-full h-[70px] flex items-center">
        <h2
          className="flex items-center gap-2 text-lg font-semibold"
          style={{ color: "#ffffff" }} // Heading color
        >
          <span
            className="w-[30px] h-[30px] flex items-center justify-center rounded-full"
            style={{ backgroundColor: "#01d293" }} // Secondary color
          >
            <i className="ri-taxi-line text-white text-sm"></i>
          </span>
          CaroteX
        </h2>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col justify-between h-[calc(100%-5%)] mt-6">
        {/* Menu */}
        <div className="flex-1">
          <ul className="flex flex-col gap-8">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-1 transition duration-300 ${
                      isActive
                        ? "rounded-md"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#ffffff", // Active color
                          backgroundColor: "#01d29333", // Active background with opacity
                        }
                      : {}
                  }
                >
                  <i
                    className={item.icon}
                    style={{ color: "#01d293" }} // Secondary color for icons
                  ></i>
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Bottom */}
        <div className="h-1/5">
          <span
            className="flex items-center gap-2 cursor-pointer transition duration-300 hover:text-white"
            style={{ color: "#808191" }} // Small text color
            onClick={handleLogout}
          >
            <i className="ri-logout-circle-r-line"></i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
