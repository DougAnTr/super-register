import { Response } from "express";
import Mailer from "../../adapters/mailer.adapter";
import { validate } from "../../helpers/validation.helper";
import { Request } from "../../interfaces/express";
import UsersService from "../users/users.service";
import VerificationCodesService from "./verification-codes.service";
import { newCodeSchema } from "./verification-codes.validation";

export default class VerificationCodesController {
  verificationCodesService: VerificationCodesService;
  usersService: UsersService;
  constructor() {
    this.verificationCodesService = new VerificationCodesService();
    this.usersService = new UsersService();
  }

  async store(req: Request, res: Response) {
    try {
      const validation = await validate(req.body, newCodeSchema);

      if (!validation.status && validation.error !== undefined) {
        return res.status(400).send({
          message: "Dados inválidos",
          error: {
            path: validation.error.path,
            errors: validation.error,
          },
        });
      }

      const user = await this.usersService.findById(Number(req.body.userId));

      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const code = await this.verificationCodesService.generate(
        req.body.userId
      );

      await Mailer.sendEmail({
        to: user.email,
        subject: "SuperRegister - Validação de email",
        text: `Aqui está seu código de confirmação: ${code}`,
      });

      return res.send({
        message: "Novo código enviado",
      });
    } catch (error) {
      console.error(error);
      return res.status(501).send("Internal server error.");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const isValidCode = this.verificationCodesService.validate(
        Number(userId),
        req.body.code
      );

      if (!isValidCode) {
        return res.status(400).send({
          message: "Código inválido",
        });
      }

      return res.send("");
    } catch (error) {
      return res.status(501).send("Internal server error.");
    }
  }
}
