import { DeepPartial, getRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export default class UsersService {
  private usersRepository: Repository<UserEntity>;

  constructor() {
    this.usersRepository = getRepository(UserEntity);
  }

  async create(data: DeepPartial<UserEntity>) {
    const user = await this.usersRepository.create(data);

    const { password, ...newUser } = await this.usersRepository.save(user);
    return newUser;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ["id", "password"],
    });
  }

  async update(criteria: any, data: DeepPartial<UserEntity>) {
    return this.usersRepository.update(criteria, data);
  }

  async findById(id: number) {
    return this.usersRepository.findOne(id);
  }
}
