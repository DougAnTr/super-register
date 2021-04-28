import ValidationResponseInterface from "../interfaces/validation-response.interface";

export async function validate(data: any, schema: any) {
  const response: ValidationResponseInterface = {
    status: true,
  };

  try {
    await schema.validate(data);

    return response;
  } catch (e) {
    response.status = false;
    response.error = e;

    return response;
  }
}
