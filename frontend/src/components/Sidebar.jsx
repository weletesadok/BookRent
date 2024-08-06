import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  LibraryBooks,
  People,
  Person,
  Notifications,
  Settings,
  Logout,
  Add,
} from "@mui/icons-material";

const BUTTONS = {
  DASHBOARD: "dashboard",
  BOOKS: "books",
  OWNERS: "owners",
  USERS: "users",
  ADD: "Add Book",
  NOTIFICATIONS: "notifications",
  SETTINGS: "settings",
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeButton, setActiveButton] = useState(BUTTONS.DASHBOARD);

  const handleExpandCollapse = () => {
    setExpanded((prev) => !prev);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Box
      sx={{
        width: expanded ? 200 : 60,
        height: "100%",
        backgroundColor: "#171B36",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 0.3s",
        padding: "8px",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #FFFFFF",
        }}
      >
        <IconButton
          onClick={handleExpandCollapse}
          sx={{ color: "#FFFFFF", fontSize: "1rem" }}
        >
          <MenuIcon />
        </IconButton>
        {expanded && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <LibraryBooks
              sx={{ marginRight: "4px", color: "#00ABFF", fontSize: "1.2rem" }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.875rem",
              }}
            >
              Book Rent
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: "#FFFFFF" }} />

      <Box sx={{ flexGrow: 1 }}>
        <List>
          {Object.entries(BUTTONS)
            .slice(0, 5)
            .map(([key, value]) => (
              <ListItem
                button
                key={value}
                onClick={() => handleButtonClick(value)}
                sx={{
                  padding: "6px 12px",
                  backgroundColor:
                    activeButton === value ? "#00ABFF" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      activeButton !== value ? "#2D3A6E" : "#00ABFF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeButton === value ? "#FFFFFF" : "#B0B0B0",
                    minWidth: "auto",
                    fontSize: "1.2rem",
                  }}
                >
                  {
                    {
                      [BUTTONS.DASHBOARD]: <Dashboard />,
                      [BUTTONS.BOOKS]: <LibraryBooks />,
                      [BUTTONS.OWNERS]: <People />,
                      [BUTTONS.USERS]: <Person />,
                      [BUTTONS.ADD]: <Add />,
                    }[value]
                  }
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={value.charAt(0).toUpperCase() + value.slice(1)}
                    sx={{ fontSize: "0.875rem" }}
                  />
                )}
              </ListItem>
            ))}
        </List>

        <Divider sx={{ borderColor: "#FFFFFF" }} />

        <List>
          {Object.entries(BUTTONS)
            .slice(5)
            .map(([key, value]) => (
              <ListItem
                button
                key={value}
                onClick={() => handleButtonClick(value)}
                sx={{
                  padding: "6px 12px",
                  backgroundColor:
                    activeButton === value ? "#00ABFF" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      activeButton !== value ? "#2D3A6E" : "#00ABFF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeButton === value ? "#FFFFFF" : "#B0B0B0",
                    minWidth: "auto",
                    fontSize: "1.2rem",
                  }}
                >
                  {
                    {
                      [BUTTONS.NOTIFICATIONS]: <Notifications />,
                      [BUTTONS.SETTINGS]: <Settings />,
                    }[value]
                  }
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={value.charAt(0).toUpperCase() + value.slice(1)}
                    sx={{ fontSize: "0.875rem" }}
                  />
                )}
              </ListItem>
            ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: "#FFFFFF" }} />

      <Box
        sx={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            width: "100%",
            maxWidth: "180px",
            fontSize: "0.875rem",
            backgroundColor: "gray",
            "&:hover": {
              backgroundColor: "#010101",
            },
          }}
        >
          <Logout sx={{ marginRight: "4px", fontSize: "1rem" }} />
          {expanded ? "Logout" : ""}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
