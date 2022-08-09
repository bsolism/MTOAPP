import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  box: {
    display: "flex",
    boxShadow: "2px 2px 3px #38444d",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default theme;
