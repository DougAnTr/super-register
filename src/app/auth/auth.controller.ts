import UsersService from "../users/users.service";
import { Request, Response } from "express";
import { loginSchema } from "./auth.validation";
import Encrypter from "../../adapters/encrypter.adapter";
import Jwt from "../../adapters/jwt";
import { validate } from "../../helpers/validation.helper";

export default class AuthController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async login(req: Request, res: Response) {
    try {
      const validation = await validate(req.body, loginSchema);

      if (!validation.status && validation.error !== undefined) {
        return res.status(400).send({
          message: "Dados inválidos",
          error: {
            path: validation.error.path,
            errors: validation.error,
          },
        });
      }

      const user = await this.usersService.findByEmail(req.body.email);

      if (
        !user ||
        (user &&
          !(await Encrypter.validateHash(req.body.password, user.password)))
      ) {
        return res.status(400).send({
          message: "E-mail e senha não correspondem",
        });
      }

      const token = await Jwt.generateToken({ id: user.id });

      return res.send({
        token,
      });
    } catch (e) {
      return res.status(501).send("Erro interno");
    }
  }
}
