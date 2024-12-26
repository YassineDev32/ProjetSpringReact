import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResponsiveMenu = ({ showMenu, setShowMenu, isLoggedIn, setIsLoggedIn, navLinks }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setShowMenu(false);
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      setShowMenu(false);
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between hover:text-primary bg-white dark:bg-black dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        {/* Affichage conditionnel */}
        {isLoggedIn ? (
          <div className="flex items-center justify-start gap-3">
            <FaUserCircle size={50} />
            <div>
              <h1>Hello User</h1>
              <h1 className="text-sm text-slate-500">Premium user</h1>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black font-bold"
          >
            Login
          </button>
        )}

        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {navLinks.map((data) => (
              <li key={data.id}>
                <a href={data.link} className="mb-5 inline-block">
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="mt-auto self-start rounded-md bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-bold"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
