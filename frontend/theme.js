import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ABFF",
    },
    background: {
      default: "#171B36",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#00ABFF",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#0086D1",
          },
        },
      },
    },
  },
});

export default theme;
