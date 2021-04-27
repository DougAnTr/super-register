import { DeepPartial, getRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export class UsersService {
  usersRepository: Repository<UserEntity>;

  constructor() {
    this.usersRepository = getRepository(UserEntity);
  }

  async create(data: DeepPartial<UserEntity>) {
    const user = await this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }
}
