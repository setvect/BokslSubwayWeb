import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import StationList from "./StationList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

interface SearchTabProps {
  favorites: Set<string>;
  toggleFavorite: (station: string, line: string) => void;
}

const SearchTab: React.FC<SearchTabProps> = ({ favorites, toggleFavorite }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    const querySearchTerm = searchParams.get("q");
    if (querySearchTerm && querySearchTerm !== searchTerm) {
      setSearchTerm(decodeURIComponent(querySearchTerm));
    }
  }, [searchParams, searchTerm, setSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      setSearchParams({ q: encodeURIComponent(newSearchTerm) });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="역 이름을 입력하세요."
          value={searchTerm}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              endAdornment: searchTerm && (
                <IconButton aria-label="clear search" onClick={handleClearSearch} edge="end">
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
