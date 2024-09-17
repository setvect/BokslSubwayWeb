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

    // 정렬 함수 추가
    const sortStations = (stations: Station[]): Station[] => {
      return stations.sort((a, b) => {
        // 먼저 이름으로 정렬
        const nameComparison = a.name.localeCompare(b.name, "ko");
        if (nameComparison !== 0) return nameComparison;

        // 이름이 같으면 노선으로 정렬
        return a.line.localeCompare(b.line, "ko");
      });
    };

    // 필터링 후 정렬 적용
    setFilteredStations(sortStations(filtered));
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
