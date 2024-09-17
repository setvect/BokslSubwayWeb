import React, { useEffect, useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import StationList from "./StationList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

interface SearchTabProps {
  favorites: Set<string>;
  toggleFavorite: (station: string, line: string) => void;
}

const SearchTab: React.FC<SearchTabProps> = React.memo(({ favorites, toggleFavorite }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    const querySearchTerm = searchParams.get("q");
    if (querySearchTerm && querySearchTerm !== searchTerm) {
      setSearchTerm(decodeURIComponent(querySearchTerm));
    }
  }, [searchParams, searchTerm, setSearchTerm]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      if (newSearchTerm) {
        setSearchParams({ q: encodeURIComponent(newSearchTerm) });
      } else {
        setSearchParams({});
      }
    },
    [setSearchTerm, setSearchParams]
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchParams({});
  }, [setSearchTerm, setSearchParams]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }} role="search">
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="역 이름을 입력하세요."
          value={searchTerm}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              "aria-label": "역 이름 검색",
              endAdornment: searchTerm && (
                <IconButton aria-label="검색어 지우기" onClick={handleClearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }} role="region" aria-label="검색 결과">
        <StationList searchTerm={searchTerm} favorites={favorites} toggleFavorite={toggleFavorite} />
      </Box>
    </Box>
  );
});

export default SearchTab;
