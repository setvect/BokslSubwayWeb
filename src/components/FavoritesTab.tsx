import React from "react";
import { Box, Typography } from "@mui/material";
import StationList from "./StationList";

interface FavoritesTabProps {
  favorites: Set<string>;
  toggleFavorite: (station: string) => void;
}

const FavoritesTab: React.FC<FavoritesTabProps> = ({
  favorites,
  toggleFavorite,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <StationList
        searchTerm=""
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </Box>
  );
};

export default FavoritesTab;
