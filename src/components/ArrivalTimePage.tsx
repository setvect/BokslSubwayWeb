import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography, CircularProgress } from "@mui/material";
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
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ marginLeft: "16px" }}>
            {stationName} <span style={{ color: getLineColor(line || "") }}>{line}</span>
          </Typography>
        </Toolbar>
      </AppBar>
      {loading ? (
        <CircularProgress sx={{ margin: "auto" }} />
      ) : error ? (
        <Typography color="error" sx={{ margin: "auto" }}>
          {error}
        </Typography>
      ) : (
        <List>
          {arrivalTimes.map((time, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={time.trainLineNm}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2">
                      {` ${time.arvlMsg2}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ArrivalTimePage;
