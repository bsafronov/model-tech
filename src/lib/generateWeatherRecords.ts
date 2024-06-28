import { USERS, WEATHER_TYPES } from "./consts";
import { WeatherRecord } from "./types";
import { faker } from "@faker-js/faker";

const RECORD_COUNT = 100;

export const generateWeatherRecords = (): WeatherRecord[] => {
  const weatherTypeIDs = WEATHER_TYPES.map((type) => type.id);
  const userTypeIDs = USERS.map((user) => user.id);

  return Array.from({ length: RECORD_COUNT }).map((_, index) => {
    const record: WeatherRecord = {
      id: index + 1,
      createdAt: faker.date.recent({
        days: index + 1,
      }),
      comment: faker.lorem.paragraph(),
      authorId: faker.helpers.arrayElement(userTypeIDs),
      value: faker.number.float({
        min: -50,
        max: 60,
        fractionDigits: 2,
      }),
      typeId: faker.helpers.arrayElement(weatherTypeIDs),
    };

    return record;
  });
};
