import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SubwayArrivalInfo from "./components/SubwayArrivalInfo";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <SubwayArrivalInfo />
      </Router>
    </ThemeProvider>
  );
}

export default App;
