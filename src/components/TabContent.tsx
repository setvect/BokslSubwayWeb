import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const SearchTab = React.lazy(() => import("./SearchTab"));
const FavoritesTab = React.lazy(() => import("./FavoritesTab"));
const HelpTab = React.lazy(() => import("./HelpTab"));

interface TabContentProps {
  favorites: Set<string>;
  toggleFavorite: (station: string, line: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({ favorites, toggleFavorite }) => (
  <Box sx={{ flexGrow: 1, overflow: "auto" }} role="region" aria-label="탭 내용">
    <Suspense
      fallback={
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} aria-label="로딩 중" />
      }
    >
      <Routes>
        <Route path="/*" element={<SearchTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<FavoritesTab favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/help" element={<HelpTab />} />
      </Routes>
    </Suspense>
  </Box>
);

export default TabContent;
