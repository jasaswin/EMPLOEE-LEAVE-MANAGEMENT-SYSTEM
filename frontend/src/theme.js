
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#F5C16C", 
    },

    secondary: {
      main: "#F4A261", 
    },

    background: {
      default: "#0E0E0E",
      paper: "#1A1A1A",   
    },

    text: {
      primary: "#F5C16C",
      secondary: "#F4A261",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "sans-serif"
    ].join(","),

    h1: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 700,
      letterSpacing: "0.05em",
    },

    h2: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.08em",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 0 12px rgba(245, 193, 108, 0.35)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 0 22px rgba(244, 162, 97, 0.6)",
            transform: "translateY(-2px)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        },
      },
    },
  },
});

export default theme;
