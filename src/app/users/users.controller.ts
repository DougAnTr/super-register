import { Request, Response } from "express";
import * as yup from "yup";

export default class UsersController {
  async store(req: Request, res: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "Password must contain minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character"
        )
        .required(),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required(),
      firstName: yup.string().required(),
      surName: yup.string().required(),
    });

    schema.validate(req.body).catch((err) => {
      return res.status(400).send({
        message: "Dados inválidos.",
        error: {
          path: err.path,
          errors: err.errors,
        },
      });
    });

    return res.status(200);
  }
}
