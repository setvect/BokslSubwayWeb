import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchTab from "./SearchTab";
import FavoritesTab from "./FavoritesTab";
import HelpTab from "./HelpTab";
import { useNavigate, useLocation, Routes, Route, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useSearch } from "../contexts/SearchContext";

const SubwayArrivalInfo: React.FC = () => {
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const routes = ["", "favorites", "help"];
    navigate(routes[newValue]);
  };

  const toggleFavorite = (station: string, line: string) => {
    const favoriteKey = `${station}|${line}`;
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(favoriteKey)) {
        newFavorites.delete(favoriteKey);
      } else {
        newFavorites.add(favoriteKey);
      }
      Cookies.set("favorites", JSON.stringify(Array.from(newFavorites)), { expires: 365 });
      return newFavorites;
    });
  };

  const getCurrentTabIndex = () => {
    if (location.pathname.includes("favorites")) return 1;
    if (location.pathname.includes("help")) return 2;
    return 0;
  };

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
        <Routes>
          <Route path="/*" element={<SearchTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<FavoritesTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/help" element={<HelpTab />} />
        </Routes>
      </Box>
    </Paper>
  );
};

export default SubwayArrivalInfo;
