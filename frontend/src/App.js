import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import VerificationPage from "./pages/VerificationPage";
import CarList from "./pages/CarList";
import CarDetails from "./pages/CarDetails";
import ProfileSettings from "./pages/ProfileSettings";
import PasswordResetSent from "./pages/ResetPasswordPages/PasswordResetSent";
import ResetPassword from "./pages/ResetPasswordPages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import DDashboard from "./components/Dashboard/pages/Dashboard";
import Bookings from "./components/Dashboard/pages/Bookings"; // Import the Bookings component
import SellCar from "./components/Dashboard/pages/SellCar"; // Import the SellCar component
import Settings from "./components/Dashboard/pages/Settings"; // Import the Settings component
import UserManagement from "./components/Dashboard/pages/Utilisateurs/UserManagement"; 
import DetailsCar from "./components/Dashboard/pages/DetailsCar"; 
import ReservationManagement from "./components/Dashboard/pages/Reservations/ReservationManagement";
import RapportManagement from "./components/Dashboard/pages/Rapports/RapportManagement";

// Layout components
const ClientLayout = ({
  children,
  theme,
  setTheme,
  isLoggedIn,
  setIsLoggedIn,
}) => (
  <>
    <Navbar
      theme={theme}
      setTheme={setTheme}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
    {children}
    <Footer />
  </>
);

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
        <Routes>
          {/* Client Layout Routes */}
          <Route
            path="/"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <ParticlesComponent />
                <LandingPage theme={theme} />
              </ClientLayout>
            }
          />
          <Route
            path="/login"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <Login setIsLoggedIn={setIsLoggedIn} />
              </ClientLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <SignUp />
              </ClientLayout>
            }
          />
          <Route
            path="/verify"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <VerificationPage />
              </ClientLayout>
            }
          />
          <Route
            path="/cars"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <CarList />
              </ClientLayout>
            }
          />
          <Route
            path="/cars/:carId"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <CarDetails />
              </ClientLayout>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <ProfileSettings />
              </ClientLayout>
            }
          />
          <Route
            path="/password-reset-sent"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <PasswordResetSent />
              </ClientLayout>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <ResetPassword />
              </ClientLayout>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <ClientLayout
                theme={theme}
                setTheme={setTheme}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              >
                <Unauthorized />
              </ClientLayout>
            }
          />
          {/* Admin Protected Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                {/* The Dashboard layout is now rendered for any path under /admin */}
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes inside the Dashboard layout */}
            <Route
              path="dashboard"
              element={<DDashboard />}
            />
            {/* Replace with actual content */}
            <Route path="vehicule" element={<Bookings />} />
            <Route path="utilisateurs" element={<UserManagement />} />
            <Route path="reservations" element={<ReservationManagement />} />
            <Route path="rapport" element={<RapportManagement />} />
            <Route path="sell-car" element={<SellCar />} />
            <Route path="settings" element={<Settings />} />
            <Route path="vehicule/:carId" element={<DetailsCar />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />

          <Route
            path="/user/me"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                <ClientLayout
                  theme={theme}
                  setTheme={setTheme}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                >
                  <UserProfile />
                </ClientLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
