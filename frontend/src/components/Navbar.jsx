import { Box, Typography, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import useAuth from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";

export default () => {
  const { role } = useAuth();
  return (
    <Box
      sx={{
        // flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {role}/ Dashboard
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <HomeIcon sx={{ color: "#1976d2", marginRight: "0.5rem" }} />
        <Link
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: "1.2rem",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Home
        </Link>
      </Box>
    </Box>
  );
};
