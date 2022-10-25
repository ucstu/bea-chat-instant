import { UserInfo } from "@/entities/UserInfo";
import { HttpResponse } from "@/models/HttpResponse";
import { encryptPassword, makeSalt } from "@/utils/cryptogram";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOperator, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private usersRepository: Repository<UserInfo>
  ) {}

  async login(
    username: string,
    password: string
  ): Promise<UserInfo | HttpResponse> {
    const userInfo = await this.usersRepository.findOne({
      where: { name: new FindOperator("equal", username) },
    });
    if (!userInfo) return new HttpResponse(40002, "用户名或密码错误");
    const [salt, encryptedPassword] = userInfo.password.split(",");
    if (encryptedPassword !== encryptPassword(password, salt)) {
      return new HttpResponse(40002, "用户名或密码错误");
    }
    return userInfo;
  }

  async register(
    username: string,
    password: string
  ): Promise<UserInfo | HttpResponse> {
    const userInfoInDB = await this.usersRepository.findOne({
      where: { name: new FindOperator("equal", username) },
    });
    if (userInfoInDB) return new HttpResponse(40001, "用户名已存在");
    const salt = makeSalt();
    const userInfo: Omit<UserInfo, "userID"> = {
      name: username,
      password: `${salt},${encryptPassword(password, salt)}`,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBGTN1ddTe_0io5vluD6q-DAqWGSfIBRYOw&usqp=CAU",
      contacts: [],
    };
    const result = await this.usersRepository.save([userInfo]);
    if (!result[0]) return new HttpResponse(50001, "服务器内部错误");
    return result[0];
  }

  async searchUser(username: string) {
    return await this.usersRepository.find({
      where: { name: new FindOperator("equal", username) },
    });
  }
}
