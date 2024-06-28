import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { userApi, weatherApi } from "../lib/api";
import { WeatherRecord } from "../lib/types";
import { format } from "date-fns";

export const WeatherTable = () => {
  const { data, isLoading } = weatherApi.useGetWeatherRecordsQuery();
  const { data: users } = userApi.useGetUsersQuery();
  const { data: weatherTypes } = weatherApi.useGetWeatherTypesQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  const dateFormat = (record: WeatherRecord) =>
    format(record.createdAt, "dd.MM.yyyy HH:mm");

  const authorName = (record: WeatherRecord) =>
    users?.find((user) => user.id === record.authorId)?.name;

  const weatherTypeName = (record: WeatherRecord) =>
    weatherTypes?.find((type) => type.id === record.typeId)?.label;

  return (
    <DataTable value={data} emptyMessage="Записи отсутствуют">
      <Column field="date" header="Дата и время" body={dateFormat} />
      <Column field="value" header="Температура" />
      <Column field="typeId" header="Погода" body={weatherTypeName} />
      <Column field="authorId" header="Кто заполнил" body={authorName} />
      <Column field="comment" header="Комментарий" />
    </DataTable>
  );
};
