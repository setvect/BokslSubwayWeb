import { RawStation, Station } from "../types/station";
import stationsData from "../data/Stations.json";

export function parseStations(): Station[] {
  return (stationsData as RawStation[]).map((station) => ({
    stationCd: station.STATION_CD,
    name: station.STATION_NM,
    line: station.LINE_NUM,
    frCode: station.FR_CODE,
  }));
}
