import { useLocation, Navigate, Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const content =
    allowedRole === role || role === "ADMIN" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );

  return content;
};

export default RequireAuth;
