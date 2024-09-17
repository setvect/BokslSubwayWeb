import React, { useCallback } from "react";
import { ListItem, ListItemButton, ListItemText, IconButton, Typography, Box } from "@mui/material";
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
      disablePadding
      secondaryAction={
        <IconButton edge="end" onClick={handleToggleFavorite} aria-label={isFavorite ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}>
          {isFavoriteList ? <DeleteIcon /> : isFavorite ? <StarIcon sx={{ color: "yellow" }} /> : <StarBorderIcon />}
        </IconButton>
      }
    >
      <ListItemButton
        onClick={handleStationClick}
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemText
          primary={
            <Typography variant="subtitle1" component="div">
              {station.name}
            </Typography>
          }
          secondary={
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", mt: 0.5 }}>
              <Box
                component="span"
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: lineColor,
                  display: "inline-block",
                  mr: 1,
                }}
              />
              <Typography variant="body2" component="span" sx={{ color: lineColor, fontWeight: "bold" }}>
                {station.line}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
});

export default StationListItem;
