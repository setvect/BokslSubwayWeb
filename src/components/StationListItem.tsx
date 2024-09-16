import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface StationListItemProps {
  station: { name: string; line: string };
  isFavorite: boolean;
  toggleFavorite: (station: string) => void;
}

const StationListItem: React.FC<StationListItemProps> = ({
  station,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => toggleFavorite(station.name)}>
          {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
        </IconButton>
      }
    >
      <ListItemText
        primary={station.name}
        secondary={station.line}
        primaryTypographyProps={{ variant: "body1" }}
        secondaryTypographyProps={{
          variant: "body2",
          color: "text.secondary",
        }}
      />
    </ListItem>
  );
};

export default StationListItem;
