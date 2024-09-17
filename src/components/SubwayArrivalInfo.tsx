import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { Box, Typography, Tabs, Tab, Paper, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate, useLocation, Routes, Route, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useSearch } from "../contexts/SearchContext";

const SearchTab = lazy(() => import("./SearchTab"));
const FavoritesTab = lazy(() => import("./FavoritesTab"));
const HelpTab = lazy(() => import("./HelpTab"));

const SubwayArrivalInfo: React.FC = React.memo(() => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { searchTerm, setSearchTerm } = useSearch();

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
    >
      <Box sx={{ flexShrink: 0, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
          수도권 지하철 실시간 도착 안내
        </Typography>

        <Tabs
          value={getCurrentTabIndex()}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-between",
            },
          }}
        >
          <Tab
            icon={<SearchIcon sx={{ color: getCurrentTabIndex() === 0 ? "yellow" : "inherit" }} />}
            aria-label="search"
            sx={{ flexGrow: 1, maxWidth: "none" }}
          />
          <Tab
            icon={<StarIcon sx={{ color: getCurrentTabIndex() === 1 ? "yellow" : "inherit" }} />}
            aria-label="favorites"
            sx={{ flexGrow: 1, maxWidth: "none" }}
          />
          <Tab
            icon={<HelpOutlineIcon sx={{ color: getCurrentTabIndex() === 2 ? "yellow" : "inherit" }} />}
            aria-label="help"
            sx={{ flexGrow: 1, maxWidth: "none" }}
          />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Suspense
          fallback={<CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />}
        >
          <Routes>
            <Route path="/*" element={<SearchTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/favorites" element={<FavoritesTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/help" element={<HelpTab />} />
          </Routes>
        </Suspense>
      </Box>
    </Paper>
  );
});

export default SubwayArrivalInfo;
