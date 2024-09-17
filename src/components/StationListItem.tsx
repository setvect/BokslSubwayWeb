import React, { useCallback } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Station } from "../types/station";
import { useNavigate } from "react-router-dom";
import { getLineColor } from "../utils/lineColors";

interface StationListItemProps {
  station: Station;
  isFavorite: boolean;
  toggleFavorite: (station: string, line: string) => void;
  isFavoriteList?: boolean;
}

const StationListItem: React.FC<StationListItemProps> = React.memo(({ station, isFavorite, toggleFavorite, isFavoriteList = false }) => {
  const lineColor = getLineColor(station.line);
  const navigate = useNavigate();

  const handleStationClick = useCallback(() => {
    navigate(`/arrival/${encodeURIComponent(station.line)}/${encodeURIComponent(station.name)}`);
  }, [navigate, station.line, station.name]);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(station.name, station.line);
    },
    [toggleFavorite, station.name, station.line]
  );

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={handleToggleFavorite} aria-label={isFavorite ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}>
          {isFavoriteList ? <DeleteIcon /> : isFavorite ? <StarIcon sx={{ color: "yellow" }} /> : <StarBorderIcon />}
        </IconButton>
      }
      sx={{
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      role="button"
      aria-label={`${station.name} ${station.line} 도착 정보 보기`}
    >
      <ListItemText
        primary={station.name}
        secondary={station.line}
        onClick={handleStationClick}
        primaryTypographyProps={{ variant: "body1" }}
        secondaryTypographyProps={{
          variant: "body2",
          color: lineColor,
          fontWeight: "bold",
        }}
        sx={{ cursor: "pointer" }}
      />
    </ListItem>
  );
});

export default StationListItem;
