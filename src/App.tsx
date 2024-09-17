import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, GlobalStyles, CircularProgress } from "@mui/material";
import { SearchProvider } from "./contexts/SearchContext";

const SubwayArrivalInfo = lazy(() => import("./components/SubwayArrivalInfo"));
const ArrivalTimePage = lazy(() => import("./components/ArrivalTimePage"));

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
          <Suspense
            fallback={<CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/search" replace />} />
              <Route path="/search/*" element={<SubwayArrivalInfo />} />
              <Route path="/favorites/*" element={<SubwayArrivalInfo />} />
              <Route path="/help/*" element={<SubwayArrivalInfo />} />
              <Route path="/arrival/:line/:stationName" element={<ArrivalTimePage />} />
            </Routes>
          </Suspense>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
