export const subwayIdToLine: { [key: string]: string } = {
  "1001": "1호선",
  "1002": "2호선",
  "1003": "3호선",
  "1004": "4호선",
  "1005": "5호선",
  "1006": "6호선",
  "1007": "7호선",
  "1008": "8호선",
  "1009": "9호선",
  "1061": "중앙선",
  "1063": "경의선",
  "1065": "공항철도",
  "1067": "경춘선",
  "1075": "수인분당선",
  "1077": "신분당선",
  "1092": "우이신설선",
  "1093": "서해선",
  "1081": "경강선",
};

export const getLineName = (subwayId: string): string => {
  return subwayIdToLine[subwayId] || subwayId;
};
