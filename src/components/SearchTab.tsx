import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StationList from "./StationList";

interface SearchTabProps {
  favorites: Set<string>;
  toggleFavorite: (station: string) => void;
}

const SearchTab: React.FC<SearchTabProps> = ({ favorites, toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="역 이름을 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon color="action" />,
        }}
      />
      <StationList
        searchTerm={searchTerm}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </Box>
  );
};

export default SearchTab;
