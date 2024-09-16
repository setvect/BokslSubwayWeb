import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SubwayArrivalInfo from "./components/SubwayArrivalInfo";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, GlobalStyles } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const globalStyles = {
  "*::-webkit-scrollbar": {
    width: "8px",
  },
  "*::-webkit-scrollbar-track": {
    background: "#2b2b2b",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "#6b6b6b",
    borderRadius: "4px",
  },
  "*::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Router>
        <SubwayArrivalInfo />
      </Router>
    </ThemeProvider>
  );
}

export default App;
