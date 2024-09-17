import React, { useEffect, useState, useMemo } from "react";
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

const StationList: React.FC<StationListProps> = React.memo(({ searchTerm, favorites, toggleFavorite, showOnlyFavorites = false }) => {
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  const stations = useMemo(() => parseStations(), []);

  useEffect(() => {
    let filtered = stations;

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

    // 정렬 함수
    const sortStations = (stations: Station[]): Station[] => {
      return stations.sort((a, b) => {
        const nameComparison = a.name.localeCompare(b.name, "ko");
        if (nameComparison !== 0) return nameComparison;
        return a.line.localeCompare(b.line, "ko");
      });
    };

    setFilteredStations(sortStations(filtered));
  }, [searchTerm, favorites, showOnlyFavorites, stations]);

  return (
    <List>
      {filteredStations.map((station, index) => (
        <StationListItem
          key={`${station.name}|${station.line}`}
          station={station}
          isFavorite={favorites.has(`${station.name}|${station.line}`)}
          toggleFavorite={toggleFavorite}
          isFavoriteList={showOnlyFavorites}
        />
      ))}
    </List>
  );
});

export default StationList;
