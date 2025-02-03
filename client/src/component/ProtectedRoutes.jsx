import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  // Optionally, you can verify the token's validity by decoding it or checking expiry
  return token !== null;
};

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the dashboard
  return <Outlet />;
};

export default ProtectedRoute;
