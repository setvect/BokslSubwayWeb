import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import StationListItem from "./StationListItem";
import { Station } from "../types/station";
import { parseStations } from "../utils/stationParser";
import { getChosung, startsWithChosung } from "../utils/koreanUtils";

interface StationListProps {
  searchTerm: string;
  favorites: Set<string>;
  toggleFavorite: (station: string, line: string) => void;
  showOnlyFavorites?: boolean;
}

const StationList: React.FC<StationListProps> = ({ searchTerm, favorites, toggleFavorite, showOnlyFavorites = false }) => {
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  useEffect(() => {
    const stations = parseStations();
    const excludedLines = ["인천", "용인경전철", "의정부경전철", "김포도시철도", "신림선", "GTX-A"];
    let filtered = stations.filter((station) => !excludedLines.some((line) => station.line.includes(line)));

    if (showOnlyFavorites) {
      filtered = filtered.filter((station) => favorites.has(`${station.name}|${station.line}`));
    } else if (searchTerm) {
      filtered = filtered.filter((station) => {
        const stationName = station.name.toLowerCase();
        const search = searchTerm.toLowerCase();
        return (
          stationName.startsWith(search) ||
          (search.length === stationName.length && startsWithChosung(stationName, getChosung(search))) ||
          (search.length < stationName.length && /^[ㄱ-ㅎ]+$/.test(search) && startsWithChosung(stationName, search))
        );
      });
    }

    setFilteredStations(filtered);
  }, [searchTerm, favorites, showOnlyFavorites]);

  return (
    <List>
      {filteredStations.map((station, index) => (
        <StationListItem
          key={index}
          station={station}
          isFavorite={favorites.has(`${station.name}|${station.line}`)}
          toggleFavorite={toggleFavorite}
          isFavoriteList={showOnlyFavorites}
        />
      ))}
    </List>
  );
};

export default StationList;
