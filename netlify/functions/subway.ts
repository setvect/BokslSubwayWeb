import { Handler } from "@netlify/functions";
import axios from "axios";

const BASE_URL = "http://swopenapi.seoul.go.kr/api/subway";
const PAGE_SIZE = 5;

interface SubwayApiResponse {
  errorMessage: {
    status: number;
    code: string;
    message: string;
    total: number;
  };
  realtimeArrivalList: any[];
}

export const handler: Handler = async (event) => {
  const { station } = event.queryStringParameters || {};

  if (!station) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Station parameter is required" }),
    };
  }

  try {
    let allResults: any[] = [];
    let currentPage = 1;
    let totalCount = 0;

    do {
      const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
      const endIndex = currentPage * PAGE_SIZE;
      const response = await axios.get<SubwayApiResponse>(
        `${BASE_URL}/sample/json/realtimeStationArrival/${startIndex}/${endIndex}/${encodeURIComponent(station)}`
      );

      const { errorMessage, realtimeArrivalList } = response.data;
      totalCount = errorMessage.total;
      allResults = allResults.concat(realtimeArrivalList);
      currentPage++;
    } while (allResults.length < totalCount);

    return {
      statusCode: 200,
      body: JSON.stringify({
        total: totalCount,
        realtimeArrivalList: allResults,
      }),
    };
  } catch (error) {
    console.error("Error fetching subway data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch subway data" }),
    };
  }
};
