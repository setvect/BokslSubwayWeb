export const lineColors: { [key: string]: string } = {
  "1호선": "#0052A4",
  "2호선": "#009246",
  "3호선": "#EF7C1C",
  "4호선": "#00A5DE",
  "5호선": "#996CAC",
  "6호선": "#CD7C2F",
  "7호선": "#747F00",
  "8호선": "#EA545D",
  "9호선": "#BDB092",
  중앙선: "#00AC73",
  경의중앙선: "#00AC73",
  공항철도: "#0090D2",
  경춘선: "#0D3692",
  수인분당선: "#F5A200",
  신분당선: "#BB1833",
  우이신설선: "#B0CE18",
  서해선: "#8CADCB",
  경강선: "#003DA5",
  신림선: "#6789CA",
};

export const getLineColor = (line: string): string => {
  return lineColors[line] || "#FFF";
};
