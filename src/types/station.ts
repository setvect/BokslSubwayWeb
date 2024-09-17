export interface RawStation {
  STATION_CD: string;
  STATION_NM: string;
  LINE_NUM: string;
}

export interface Station {
  stationCd: string;
  name: string;
  line: string;
}
