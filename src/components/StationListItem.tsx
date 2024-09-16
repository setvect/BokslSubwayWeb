import React from "react";
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

const StationListItem: React.FC<StationListItemProps> = ({ station, isFavorite, toggleFavorite, isFavoriteList = false }) => {
  const lineColor = getLineColor(station.line);
  const navigate = useNavigate();

  const handleStationClick = () => {
    navigate(`/arrival/${encodeURIComponent(station.line)}/${encodeURIComponent(station.name)}`);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => toggleFavorite(station.name, station.line)}>
          {isFavoriteList ? <DeleteIcon /> : isFavorite ? <StarIcon sx={{ color: "yellow" }} /> : <StarBorderIcon />}
        </IconButton>
      }
      sx={{
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
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
};

export default StationListItem;
