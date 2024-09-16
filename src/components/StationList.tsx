import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import StationListItem from "./StationListItem";
import { Station } from "../types/station";
import { parseStations } from "../utils/stationParser";

interface StationListProps {
  searchTerm: string;
  favorites: Set<string>;
  toggleFavorite: (station: string) => void;
}

const StationList: React.FC<StationListProps> = ({ searchTerm, favorites, toggleFavorite }) => {
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  useEffect(() => {
    const stations = parseStations();
    const excludedLines = ["인천", "용인경전철", "의정부경전철", "김포도시철도", "신림선", "GTX-A"];
    const filtered = stations
      .filter((station) => !excludedLines.some((line) => station.line.includes(line)))
      .filter((station) => station.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredStations(filtered);
  }, [searchTerm]);

  return (
    <List>
      {filteredStations.map((station, index) => (
        <StationListItem key={index} station={station} isFavorite={favorites.has(station.name)} toggleFavorite={toggleFavorite} />
      ))}
    </List>
  );
};

export default StationList;
