import { object, number } from "yup";

export const newCodeSchema = object().shape({
  userId: number().required(),
});
