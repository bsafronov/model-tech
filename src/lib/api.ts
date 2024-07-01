import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateWeatherRecord,
  User,
  WeatherRecord,
  WeatherType,
} from "../lib/types";

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
    addWeatherRecord: builder.mutation<WeatherRecord, CreateWeatherRecord>({
      query: (body) => ({
        url: `weather`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          dispatch(
            weatherApi.util.updateQueryData(
              "getWeatherRecords",
              undefined,
              (draft) => {
                draft.unshift(result.data);
              }
            )
          );
        } catch {
          // Обработка ошибки
        }
      },
    }),
    removeWeatherRecord: builder.mutation<WeatherRecord, ID>({
      query: (id) => ({
        url: `weather/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            weatherApi.util.updateQueryData(
              "getWeatherRecords",
              undefined,
              (draft) => {
                draft.splice(
                  draft.findIndex((record) => record.id === id),
                  1
                );
              }
            )
          );
        } catch {
          // Обработка ошибки
        }
      },
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
