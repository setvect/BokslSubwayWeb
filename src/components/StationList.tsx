import React from "react";
import { List } from "@mui/material";
import StationListItem from "./StationListItem";

interface StationListProps {
  searchTerm: string;
  favorites: Set<string>;
  toggleFavorite: (station: string) => void;
}

const StationList: React.FC<StationListProps> = ({
  searchTerm,
  favorites,
  toggleFavorite,
}) => {
  const stations = [
    { name: "4.19 민주묘지", line: "우이신설경전철" },
    { name: "가능", line: "1호선" },
    // ... 나머지 역 정보
  ];

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <List>
      {filteredStations.map((station, index) => (
        <StationListItem
          key={index}
          station={station}
          isFavorite={favorites.has(station.name)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </List>
  );
};

export default StationList;
