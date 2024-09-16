import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchTab from "./SearchTab";
import FavoritesTab from "./FavoritesTab";
import HelpTab from "./HelpTab";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

const SubwayArrivalInfo: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const routes = ["", "favorites", "help"];
    navigate(routes[newValue]);
  };

  const toggleFavorite = (station: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(station)) {
        newFavorites.delete(station);
      } else {
        newFavorites.add(station);
      }
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
          <Tab icon={<SearchIcon />} aria-label="search" sx={{ flexGrow: 1, maxWidth: "none" }} />
          <Tab icon={<StarIcon />} aria-label="favorites" sx={{ flexGrow: 1, maxWidth: "none" }} />
          <Tab icon={<HelpOutlineIcon />} aria-label="help" sx={{ flexGrow: 1, maxWidth: "none" }} />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<SearchTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<FavoritesTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
          <Route path="/help" element={<HelpTab />} />
        </Routes>
      </Box>
    </Paper>
  );
};

export default SubwayArrivalInfo;
