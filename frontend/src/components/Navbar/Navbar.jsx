import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import axios from "axios";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({ theme, setTheme, isLoggedIn, setIsLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getNavLinks = () => {
    const baseNavLinks = [
      { id: 1, name: "HOME", link: "/#home" },
      { id: 2, name: "CARS", link: "/cars" },
      { id: 3, name: "ABOUT", link: "/#about" },
    ];   

    if (isLoggedIn) {
      return [...baseNavLinks, { id: 4, name: "MY BOOKING", link: "/mybooking" }];
    }

    return baseNavLinks;
  };

  const navLinks = getNavLinks();

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-primary duration-300">
      <div className="container py-4 px-6 md:px-16 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold font-serif">
          CaroteX
        </Link>

        {/* Icône de Menu pour Mobile */}
        <div className="flex items-center gap-4 md:hidden ">
          {/* dark  mode */}
          {theme === "dark" ? (
            <BiSolidSun
              onClick={() => setTheme("light")}
              className="text-2xl"
            />
          ) : (
            <BiSolidMoon
              onClick={() => setTheme("dark")}
              className="text-2xl"
            />
          )}
          {/* Mobile Hamburger icon */}
          {showMenu ? (
            <HiX
              onClick={toggleMenu}
              className=" cursor-pointer transition-all"
              size={30}
            />
          ) : (
            <HiMenuAlt3
              onClick={toggleMenu}
              className="cursor-pointer transition-all"
              size={30}
            />
          )}
        </div>
        {/* Navigation pour Tablette & Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ id, name, link }) => (
            <li key={id} className="py-4 list-none">
              <Link
                to={link}
                className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
              >
                {name}
              </Link>
            </li>
          ))}

          {theme === "dark" ? (
            <BiSolidSun
              onClick={() => setTheme("light")}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <BiSolidMoon
              onClick={() => setTheme("dark")}
              className="text-2xl cursor-pointer"
            />
          )}

          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle
                className="text-3xl cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/edit-profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Voir Détails
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black font-bold"
                onClick={() => setShowUserMenu(false)}
              >
                Login
              </button>
            </Link>
          )}
        </nav>
      </div>

      {/* Menu Mobile */}
      <ResponsiveMenu
        setShowMenu={setShowMenu}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showMenu={showMenu}
        navLinks={navLinks} // Pass navLinks as a prop
      />
    </div>
  );
};

export default Navbar;
