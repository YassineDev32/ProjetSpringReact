import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import axios from "axios";

const Sidebar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  };

  return (
    <div
      className="w-[260px] h-full fixed top-0 left-0 z-[999] p-6 bg-[#181b3a] transition-all ease-in-out duration-300"
    >
      {/* Sidebar Top */}
      <div className="w-full h-[70px] flex items-center mb-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <span
            className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#01d293]"
          >
            <i className="ri-taxi-line text-white text-sm"></i>
          </span>
          CaroteX
        </h2>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col justify-between h-[calc(100%-5%)]">
        {/* Menu */}
        <div className="flex-1">
          <ul className="flex flex-col gap-8">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-[#01d29333] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#01d2931a]"
                    }`
                  }
                >
                  <i
                    className={`${item.icon} text-[#01d293] transition-all duration-300`}
                  ></i>
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Bottom */}
        <div className="h-[20%] mt-6">
          <span
            className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md transition-all duration-300 text-gray-400 hover:text-white bg-[#ff0c0ca2] hover:bg-[#01d2931a]"
            onClick={handleLogout}
          >
            <i className="ri-logout-circle-r-line text-lg"></i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
