import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Components import
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ParticlesComponent from "./components/ParticlesBackground/ParticlesBackground";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages import
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import VerificationPage from "./pages/VerificationPage";
import CarList from "./pages/CarList";
import CarDetails from "./pages/CarDetails";
import ProfileSettings from "./pages/ProfileSettings";
import PasswordResetSent from "./pages/ResetPasswordPages/PasswordResetSent";
import ResetPassword from "./pages/ResetPasswordPages/ResetPassword";

const App = () => {
  // Dark mode state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Vérifie l'état de connexion
  }, []);

  // Gestion du thème
  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Navbar
          theme={theme}
          setTheme={setTheme}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ParticlesComponent />
                <LandingPage theme={theme} />
              </>
            }
          />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/edit-profile" element={<ProfileSettings />} />
          <Route path="/password-reset-sent" element={<PasswordResetSent/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />

          {/* Routes protégées */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}
          >
            <Route path="" element={<AdminDashboard />} />
          </Route>

          <Route
            path="/user/me"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />
            }
          >
            <Route path="" element={<UserProfile />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
