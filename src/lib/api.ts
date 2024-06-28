import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, WeatherRecord, WeatherType } from "../lib/types";

const BASE_URL = "http://localhost:5173/";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWeatherRecords: builder.query<WeatherRecord[], void>({
      query: () => `weather`,
    }),
    getWeatherTypes: builder.query<WeatherType[], void>({
      query: () => `weather/types`,
    }),
  }),
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `users`,
    }),
  }),
});
