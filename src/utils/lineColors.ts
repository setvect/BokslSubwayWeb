export const lineColors: { [key: string]: string } = {
  "01호선": "#0052A4",
  "02호선": "#009246",
  "03호선": "#EF7C1C",
  "04호선": "#00A5DE",
  "05호선": "#996CAC",
  "06호선": "#CD7C2F",
  "07호선": "#747F00",
  "08호선": "#EA545D",
  "09호선": "#BDB092",
  중앙선: "#00AC73",
  경의선: "#00AC73",
  공항철도: "#0090D2",
  경춘선: "#0D3692",
  수인분당선: "#F5A200",
  신분당선: "#BB1833",
  우이신설경전철: "#B0CE18",
  서해선: "#8CADCB",
  경강선: "#003DA5",
};

export const getLineColor = (line: string): string => {
  return lineColors[line] || "#FFF";
};
