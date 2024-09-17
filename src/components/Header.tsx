import React from "react";
import { Typography, Box } from "@mui/material";

const Header: React.FC = () => (
  <Box sx={{ flexShrink: 0, borderBottom: 1, borderColor: "divider" }}>
    <Typography variant="h6" sx={{ p: 2, pb: 1 }} role="heading" aria-level={1}>
      수도권 지하철 실시간 도착 안내
    </Typography>
  </Box>
);

export default Header;
