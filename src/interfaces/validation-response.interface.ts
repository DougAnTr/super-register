import { ValidationError } from "yup";

export default interface ValidationResponseInterface {
  status: boolean;
  error?: ValidationError;
}
