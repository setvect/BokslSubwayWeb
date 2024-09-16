import React from "react";
import { Box, Typography } from "@mui/material";
import StationList from "./StationList";

interface FavoritesTabProps {
  favorites: Set<string>;
  toggleFavorite: (station: string, line: string) => void; // 여기를 수정
}

const FavoritesTab: React.FC<FavoritesTabProps> = ({ favorites, toggleFavorite }) => {
  return (
    <Box sx={{ height: "100%", overflow: "auto" }}>
      {favorites.size > 0 ? (
        <StationList searchTerm="" favorites={favorites} toggleFavorite={toggleFavorite} showOnlyFavorites={true} />
      ) : (
        <Typography sx={{ p: 2, textAlign: "center" }}>즐겨찾기한 역이 없습니다.</Typography>
      )}
    </Box>
  );
};

export default FavoritesTab;
