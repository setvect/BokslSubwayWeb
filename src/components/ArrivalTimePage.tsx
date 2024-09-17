import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLineColor } from "../utils/lineColors";
import { SubwayArrival } from "../types/subwayArrival";
import { getLineName } from "../utils/lineMapping";

const ArrivalTimePage: React.FC = () => {
  const { line, stationName } = useParams<{ line: string; stationName: string }>();
  const navigate = useNavigate();
  const [arrivalTimes, setArrivalTimes] = useState<SubwayArrival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArrivalTimes = async () => {
      try {
        const response = await fetch(`/.netlify/functions/subway?station=${encodeURIComponent(stationName || "")}`);
        if (!response.ok) {
          throw new Error("Failed to fetch arrival times");
        }
        const data = await response.json();
        const filteredArrivals = data.realtimeArrivalList.filter((arrival: SubwayArrival) => getLineName(arrival.subwayId) === line);
        setArrivalTimes(filteredArrivals);
      } catch (err) {
        setError("도착 정보가 없어요.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArrivalTimes();
  }, [stationName, line]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
            {stationName}
          </Typography>
          <Box
            sx={{
              backgroundColor: getLineColor(line || ""),
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            {line}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : error ? (
          <Typography color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        ) : (
          <List>
            {arrivalTimes.map((time, index) => (
              <ListItem key={index} divider sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {time.trainLineNm}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {time.arvlMsg2}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default ArrivalTimePage;
