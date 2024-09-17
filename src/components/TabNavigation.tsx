import React from "react";
import { Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface TabNavigationProps {
  currentTabIndex: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentTabIndex, handleTabChange }) => (
  <Tabs
    value={currentTabIndex}
    onChange={handleTabChange}
    sx={{
      "& .MuiTabs-flexContainer": {
        justifyContent: "space-between",
      },
    }}
    aria-label="지하철 정보 탭"
  >
    <Tab
      icon={<SearchIcon sx={{ color: currentTabIndex === 0 ? "yellow" : "inherit" }} />}
      aria-label="역 검색"
      sx={{ flexGrow: 1, maxWidth: "none" }}
    />
    <Tab
      icon={<StarIcon sx={{ color: currentTabIndex === 1 ? "yellow" : "inherit" }} />}
      aria-label="즐겨찾기"
      sx={{ flexGrow: 1, maxWidth: "none" }}
    />
    <Tab
      icon={<HelpOutlineIcon sx={{ color: currentTabIndex === 2 ? "yellow" : "inherit" }} />}
      aria-label="도움말"
      sx={{ flexGrow: 1, maxWidth: "none" }}
    />
  </Tabs>
);

export default TabNavigation;
