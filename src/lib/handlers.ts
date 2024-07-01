import { http, HttpResponse } from "msw";
import { USERS, WEATHER_TYPES } from "../lib/consts";
import { generateWeatherRecords } from "../lib/generateWeatherRecords";
import { CreateWeatherRecord, WeatherRecord } from "./types";

const weatherRecords = generateWeatherRecords();

export const handlers = [
  http.get("/users", () => {
    return HttpResponse.json(USERS);
  }),
  http.get("/weather", () => {
    return HttpResponse.json(weatherRecords);
  }),
  http.get("/weather/types", () => {
    return HttpResponse.json(WEATHER_TYPES);
  }),
  http.post<never, CreateWeatherRecord>("/weather", async ({ request }) => {
    const json = await request.json();

    const newRecord: WeatherRecord = {
      ...json,
      id: Date.now(),
      createdAt: new Date(),
    };

    return HttpResponse.json(newRecord);
  }),
  http.delete<{ id: string }, never>("/weather/:id", async ({ params }) => {
    const id = Number(params.id);

    // const weatherRecord = weatherRecords.find((record) => record.id === id);

    // if (!weatherRecord) {
    //   return HttpResponse.json({}, { status: 404 });
    // }

    return HttpResponse.json(id);
  }),
];
