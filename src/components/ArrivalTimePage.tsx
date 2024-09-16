import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLineColor } from "../utils/lineColors";

const ArrivalTimePage: React.FC = () => {
  const { line, stationName } = useParams<{ line: string; stationName: string }>();
  const navigate = useNavigate();

  // 여기에 실제 도착 시간 데이터를 가져오는 로직을 구현해야 합니다.
  const arrivalTimes = [
    { direction: "별내행 - 송파방면", line: "08호선" },
    { direction: "별내행 - 송파방면", line: "08호선", details: "(남한산성입구(성남법원,검찰청))" },
    { direction: "모란행 - 문정방면", line: "08호선", details: "(잠실)" },
    { direction: "모란행 - 문정방면", line: "08호선", details: "(암사)" },
  ];

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
            {stationName}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {arrivalTimes.map((time, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={time.direction}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" style={{ color: getLineColor(time.line) || "inherit", fontWeight: "bold" }}>
                    {time.line}
                  </Typography>
                  {time.details && (
                    <Typography component="span" variant="body2">
                      {` ${time.details}`}
                    </Typography>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ArrivalTimePage;
