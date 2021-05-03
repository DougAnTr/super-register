import { format, isAfter } from "date-fns";
import { getRepository, Repository } from "typeorm";
import UsersService from "../users/users.service";
import { VerificationCodeEntity } from "./verification-code.entity";

export default class VerificationCodesService {
  verificationCodesRepository: Repository<VerificationCodeEntity>;
  usersService: UsersService;

  constructor() {
    this.verificationCodesRepository = getRepository(VerificationCodeEntity);
    this.usersService = new UsersService();
  }

  async generate(userId: number) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const generatedCode = await this.verificationCodesRepository.create({
      code,
      userId,
    });

    return this.verificationCodesRepository.save(generatedCode);
  }

  async validate(userId: number, code: string) {
    const validCode = await this.verificationCodesRepository.findOne({
      where: { userId, code },
    });

    const today = new Date();

    if (
      !validCode ||
      (validCode && isAfter(today, new Date(validCode.expirationDate)))
    ) {
      return false;
    }

    const verifiedAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    await this.usersService.update(userId, { verifiedAt });

    return true;
  }
}
