import React, { useState, useEffect, useCallback } from "react";
import { Paper } from "@mui/material";
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
      const routes = ["", "favorites", "help"];
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
    if (location.pathname.includes("favorites")) return 1;
    if (location.pathname.includes("help")) return 2;
    return 0;
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
      role="main"
      aria-label="지하철 도착 정보"
    >
      <Header />
      <TabNavigation currentTabIndex={getCurrentTabIndex()} handleTabChange={handleTabChange} />
      <TabContent favorites={favorites} toggleFavorite={toggleFavorite} />
    </Paper>
  );
});

export default SubwayArrivalInfo;
