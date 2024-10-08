import React, { useState, useEffect, useCallback } from "react";
import { Paper, Box } from "@mui/material";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useSearch } from "../contexts/SearchContext";
import Header from "./Header";
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";

const SubwayArrivalInfo: React.FC = React.memo(() => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setSearchTerm } = useSearch();

  useEffect(() => {
    const savedFavorites = Cookies.get("favorites");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }

    const querySearchTerm = searchParams.get("q");
    if (querySearchTerm) {
      setSearchTerm(decodeURIComponent(querySearchTerm));
    }
  }, [searchParams, setSearchTerm]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      const routes = ["/search", "/favorites", "/help"];
      navigate(routes[newValue]);
    },
    [navigate]
  );

  const toggleFavorite = useCallback((station: string, line: string) => {
    setFavorites((prev) => {
      const favoriteKey = `${station}|${line}`;
      const newFavorites = new Set(prev);
      if (newFavorites.has(favoriteKey)) {
        newFavorites.delete(favoriteKey);
      } else {
        newFavorites.add(favoriteKey);
      }
      Cookies.set("favorites", JSON.stringify(Array.from(newFavorites)), { expires: 365 });
      return newFavorites;
    });
  }, []);

  const getCurrentTabIndex = useCallback(() => {
    if (location.pathname.startsWith("/favorites")) return 1;
    if (location.pathname.startsWith("/help")) return 2;
    return 0;
  }, [location.pathname]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
      role="main"
      aria-label="지하철 도착 정보"
    >
      <Box sx={{ flexShrink: 0 }}>
        <Header />
        <TabNavigation currentTabIndex={getCurrentTabIndex()} handleTabChange={handleTabChange} />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <TabContent favorites={favorites} toggleFavorite={toggleFavorite} />
      </Box>
    </Paper>
  );
});

export default SubwayArrivalInfo;
