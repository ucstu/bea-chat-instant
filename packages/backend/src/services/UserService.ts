import { User, UserType } from "@/entitys/User";
import { ErrorModel } from "@/models/ErrorModel";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOperator, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async login(
    username: string,
    password: string
  ): Promise<[string, Omit<UserType, "password">] | ErrorModel> {
    const userInfo = await this.usersRepository.findOne({
      where: { name: new FindOperator("equal", username) },
    });
    if (userInfo?.password !== password) {
      return new ErrorModel(2000, "用户名或密码错误");
    }
    return ["as", { ...userInfo }];
  }

  async register(
    username: string,
    password: string
  ): Promise<[string, Omit<UserType, "password">]> {
    const userInfo = new User();
    userInfo.name = username;
    userInfo.password = password;
    userInfo.avatar =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBGTN1ddTe_0io5vluD6q-DAqWGSfIBRYOw&usqp=CAU";
    return ["as", await userInfo.save()];
  }
}
