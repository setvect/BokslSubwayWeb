import { ThemeProvider } from "@emotion/react";
import { CircularProgress, createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import Cookies from "js-cookie";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
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
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = Cookies.get("favorites");
    if (savedFavorites && JSON.parse(savedFavorites).length > 0) {
      setInitialRoute("/favorites");
    } else {
      setInitialRoute("/search");
    }
  }, []);

  if (initialRoute === null) {
    return <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ErrorBoundary>
        <SearchProvider>
          <Router>
            <Suspense
              fallback={<CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />}
            >
              <Routes>
                <Route path="/" element={<Navigate to={initialRoute} replace />} />
                <Route path="/*" element={<SubwayArrivalInfo />} />
                <Route path="/arrival/:line/:stationName" element={<ArrivalTimePage />} />
              </Routes>
            </Suspense>
          </Router>
        </SearchProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
