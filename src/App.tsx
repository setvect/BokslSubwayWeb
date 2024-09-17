import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SubwayArrivalInfo from "./components/SubwayArrivalInfo";
import ArrivalTimePage from "./components/ArrivalTimePage";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import { SearchProvider } from "./contexts/SearchContext";

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
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search/*" element={<SubwayArrivalInfo />} />
            <Route path="/favorites/*" element={<SubwayArrivalInfo />} />
            <Route path="/help/*" element={<SubwayArrivalInfo />} />
            <Route path="/arrival/:line/:stationName" element={<ArrivalTimePage />} />
          </Routes>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
