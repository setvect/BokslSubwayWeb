export interface RawStation {
  STATION_CD: string;
  STATION_NM: string;
  LINE_NUM: string;
  FR_CODE: string;
}

export interface Station {
  stationCd: string;
  name: string;
  line: string;
  frCode: string;
}
