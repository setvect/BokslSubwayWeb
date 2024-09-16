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
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="역 이름을 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
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
