// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decodedToken = JSON.parse(atob(token.split(".")[1]));
//     const userRoles = decodedToken.roles || [];
//     const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
//     return hasAccess ? children : <Navigate to="/unauthorized" replace />;
//   } catch (error) {
//     console.error("Invalid token format:", error);
//     return <Navigate to="/login" replace />;
//   }
// };


// export default ProtectedRoute;

import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ allowedRoles, children }) => {
  // Pour le développement uniquement - accès direct au dashboard technicien
  if (allowedRoles.includes("ROLE_TECH")) {
    return children
  }

  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]))
    const userRoles = decodedToken.roles || []
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role))
    return hasAccess ? children : <Navigate to="/unauthorized" replace />
  } catch (error) {
    console.error("Invalid token format:", error)
    return <Navigate to="/login" replace />
  }
}

export default ProtectedRoute
