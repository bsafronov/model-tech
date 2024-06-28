import { http, HttpResponse } from "msw";
import { USERS, WEATHER_TYPES } from "../lib/consts";
import { generateWeatherRecords } from "../lib/generateWeatherRecords";

export const handlers = [
  http.get("/users", () => {
    return HttpResponse.json(USERS);
  }),
  http.get("/weather", () => {
    return HttpResponse.json(generateWeatherRecords());
  }),
  http.get("/weather/types", () => {
    return HttpResponse.json(WEATHER_TYPES);
  }),
];
