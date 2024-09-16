import React from "react";
import { Box, Typography } from "@mui/material";

const HelpTab: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography>복슬 지하철</Typography>
      수도권 지하철 실시간 도착 안내
      <div>
        <Typography>버전</Typography>
      </div>
    </Box>
  );
};

export default HelpTab;
