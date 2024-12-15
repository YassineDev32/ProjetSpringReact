import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userRoles = decodedToken.roles || [];
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));
  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
