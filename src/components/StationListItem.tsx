import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Station } from "../types/station";

interface StationListItemProps {
  station: Station;
  isFavorite: boolean;
  toggleFavorite: (station: string) => void;
}

const lineColors: { [key: string]: string } = {
  "01호선": "#0052A4",
  "02호선": "#009246",
  "03호선": "#EF7C1C",
  "04호선": "#00A5DE",
  "05호선": "#996CAC",
  "06호선": "#CD7C2F",
  "07호선": "#747F00",
  "08호선": "#EA545D",
  "09호선": "#BDB092",
  중앙선: "#00AC73",
  경의선: "#00AC73",
  공항철도: "#0090D2",
  경춘선: "#0D3692",
  수인분당선: "#F5A200",
  신분당선: "#BB1833",
  우이신설경전철: "#B0CE18",
  서해선: "#8CADCB",
  경강선: "#003DA5",
};

const StationListItem: React.FC<StationListItemProps> = ({ station, isFavorite, toggleFavorite }) => {
  const lineColor = lineColors[station.line] || "#000000";

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => toggleFavorite(station.name)}>
          {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
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
        primaryTypographyProps={{ variant: "body1" }}
        secondaryTypographyProps={{
          variant: "body2",
          color: lineColor,
          fontWeight: "bold",
        }}
      />
    </ListItem>
  );
};

export default StationListItem;
