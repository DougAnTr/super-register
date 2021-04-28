import { Request, Response } from "express";
import UsersService from "./users.service";
import { registerSchema } from "./users.validation";
import { validate } from "../../helpers/validation.helper";

export default class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async store(req: Request, res: Response) {
    try {
      const validation = await validate(req.body, registerSchema);

      if (!validation.status && validation.error !== undefined) {
        return res.status(400).send({
          message: "Dados inválidos",
          error: {
            path: validation.error.path,
            errors: validation.error,
          },
        });
      }

      if (await this.usersService.findByEmail(req.body.email)) {
        return res.status(400).send({
          message: "Dados inválidos",
          error: {
            path: "email",
            errors: "Este e-mail já está sendo usado",
          },
        });
      }

      const createdUser = await this.usersService.create(req.body);

      return res.status(200).send(createdUser);
    } catch (e) {
      return res.status(501).send("Erro interno");
    }
  }
}
