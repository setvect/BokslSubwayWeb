import React, { useEffect, useState, useMemo } from "react";
import { FixedSizeList as VirtualList, ListChildComponentProps } from "react-window";
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
  const topHeight = showOnlyFavorites ? 110 : 200;
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [listHeight, setListHeight] = useState<number>(window.innerHeight - topHeight);

  // 창 크기 변경 시 리스트 높이 업데이트
  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight - topHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [topHeight]);

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
    <VirtualList
      height={listHeight} // 동적 높이 적용
      itemCount={filteredStations.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }: ListChildComponentProps) => (
        <div style={style}>
          <StationListItem
            key={`${filteredStations[index].name}|${filteredStations[index].line}`}
            station={filteredStations[index]}
            isFavorite={favorites.has(`${filteredStations[index].name}|${filteredStations[index].line}`)}
            toggleFavorite={toggleFavorite}
            isFavoriteList={showOnlyFavorites}
          />
        </div>
      )}
    </VirtualList>
  );
});

export default StationList;
