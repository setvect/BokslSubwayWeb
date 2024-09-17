import React from "react";
import { Box, Link, Typography, Avatar } from "@mui/material";

const HelpTab: React.FC = () => {
  return (
    <Box sx={{ height: "100%", overflow: "auto", p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar src="/boksl.png" alt="복슬지하철 로고" sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h5" sx={{ mb: 1 }}>
        복슬지하철
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        수도권 지하철 실시간 도착 안내
      </Typography>
      <Link href="https://github.com/setvect/BokslSubwayWeb" target="_blank" rel="noopener" sx={{ mt: 2 }}>
        Github Project 바로가기
      </Link>
    </Box>
  );
};

export default HelpTab;
