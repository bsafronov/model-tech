import styles from "./WeatherForm.module.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { userApi, weatherApi } from "../lib/api";
import { InputTextarea } from "primereact/inputtextarea";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { InputNumber } from "primereact/inputnumber";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  weatherType: z.object({
    id: z.number(),
    label: z.string(),
  }),
  author: z.object({
    id: z.number(),
    name: z.string(),
  }),
  comment: z.string(),
  temperature: z
    .number()
    .min(-50, "Значение не может быть меньше -50")
    .max(60, "Значение не может быть больше 60"),
});

export const WeatherForm = () => {
  const [open, setOpen] = useState(false);
  const { data: weatherTypes } = weatherApi.useGetWeatherTypesQuery();
  const { data: users } = userApi.useGetUsersQuery();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      author: undefined,
      weatherType: undefined,
      comment: "",
      temperature: 0,
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  console.log(watch("temperature"));

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(errors);
  });

  return (
    <>
      <div className={styles.main}>
        <Button onClick={() => setOpen(true)}>Добавить запись</Button>
      </div>
      <Dialog
        visible={open}
        onHide={() => setOpen(false)}
        header="Добавить запись"
      >
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.form__item}>
            <label htmlFor="weatherType" className={styles.form__label}>
              Погода
            </label>
            <Controller
              control={control}
              name="weatherType"
              render={({ field }) => (
                <>
                  <Dropdown
                    id="weatherType"
                    options={weatherTypes}
                    optionLabel="label"
                    {...field}
                  />
                </>
              )}
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="authorId" className={styles.form__label}>
              Кто заполнил
            </label>
            <Controller
              control={control}
              name="author"
              render={({ field }) => (
                <>
                  <Dropdown
                    id="author"
                    options={users}
                    optionLabel="name"
                    {...field}
                  />
                </>
              )}
            />
          </div>

          <div className={styles.form__item}>
            <label htmlFor="temperature" className={styles.form__label}>
              Температура
            </label>
            <Controller
              control={control}
              name="temperature"
              render={({
                field: { name, value, onChange, onBlur, ref, disabled },
              }) => (
                <>
                  <InputNumber
                    id="temperature"
                    invalid={!!errors.temperature}
                    maxFractionDigits={2}
                    min={-50}
                    max={60}
                    name={name}
                    onBlur={onBlur}
                    ref={ref}
                    disabled={disabled}
                    value={value}
                    onValueChange={onChange}
                  />
                </>
              )}
            />
            {errors.temperature?.message && (
              <p>{errors.temperature?.message}</p>
            )}
          </div>
          <div className={styles.form__item}>
            <label htmlFor="comment" className={styles.form__label}>
              Комментарий
            </label>
            <Controller
              control={control}
              name="comment"
              render={({ field }) => (
                <>
                  <InputTextarea id="comment" {...field} />
                </>
              )}
            />
          </div>
          <div className={styles.form__submit}>
            <Button>Сохранить</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};
