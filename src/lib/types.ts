export type WeatherRecord = {
  id: ID;
  typeId: ID;
  authorId: ID;
  createdAt: Date;
  comment: string;
  value: number;
};

export type CreateWeatherRecord = Omit<WeatherRecord, "id" | "createdAt">;

export type WeatherType = {
  id: ID;
  label: string;
};

export type User = {
  id: ID;
  name: string;
};
