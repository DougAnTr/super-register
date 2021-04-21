import { Request, Response } from "express";
import * as yup from "yup";

export default class UsersController {
  async store(req: Request, res: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirm_password: yup.string().required(),
    });

    schema.validate(req.body).catch((err) => {
      return res.status(400).send({
        message: "Dados enviados inválidos.",
        error: {
          path: err.path,
          errors: err.errors,
        },
      });
    });

    return res.status(200);
  }
}
