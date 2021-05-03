import { Request, Response } from "express";
import UsersService from "./users.service";
import { registerSchema } from "./users.validation";
import { validate } from "../../helpers/validation.helper";
import VerificationCodesService from "../verification-codes/verification-codes.service";
import Mailer from "../../adapters/mailer.adapter";

export default class UsersController {
  private usersService: UsersService;
  verificationCodesService: VerificationCodesService;

  constructor() {
    this.usersService = new UsersService();
    this.verificationCodesService = new VerificationCodesService();
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

      const validationCode = await this.verificationCodesService.generate(
        createdUser.id
      );

      await Mailer.sendEmail({
        to: createdUser.email,
        subject: "SuperRegister - Validação de email",
        text: `Aqui está seu código de confirmação: ${validationCode}`,
      });

      return res.status(200).send(createdUser);
    } catch (e) {
      return res.status(501).send("Erro interno");
    }
  }
}
