import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default () => {
  return (
    <Box sx={{ display: "flex", height: "95vh", width: "100%" }}>
      <Box sx={{ display: "flex", flex: "1" }}>
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "90%",
        }}
      >
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};
