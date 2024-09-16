import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import StationList from "./StationList";

interface SearchTabProps {
  favorites: Set<string>;
  toggleFavorite: (station: string, line: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchTab: React.FC<SearchTabProps> = ({ favorites, toggleFavorite, searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="역 이름을 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              endAdornment: searchTerm && (
                <IconButton aria-label="clear search" onClick={() => setSearchTerm("")} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <StationList searchTerm={searchTerm} favorites={favorites} toggleFavorite={toggleFavorite} />
      </Box>
    </Box>
  );
};

export default SearchTab;
