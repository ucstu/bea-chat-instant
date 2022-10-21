import { UserType } from "@/entitys/User";
import { ErrorModel } from "@/models/ErrorModel";
import { UserService } from "@/services/UserService";
import { Body, Controller, Post } from "@nestjs/common";

export interface AuthModel {
  /**
   * 登录密码
   */
  password: string;
  /**
   * 用户名称
   */
  username: string;
}

export interface AuthReturnModel {
  /**
   * 登陆令牌
   */
  token: string;
  /**
   * 用户信息
   */
  userInfo: Omit<UserType, "password">;
}

@Controller()
export class UserController {
  constructor(private readonly loginService: UserService) {}

  @Post("/login")
  async login(
    @Body() { username, password }: AuthModel
  ): Promise<AuthReturnModel | ErrorModel> {
    const serviceResult = await this.loginService.login(username, password);
    if ("code" in serviceResult) return serviceResult;
    const [token, userInfo] = serviceResult;
    return { token, userInfo };
  }

  @Post("/register")
  async register(
    @Body() { username, password }: AuthModel
  ): Promise<AuthReturnModel | ErrorModel> {
    const [token, userInfo] = await this.loginService.register(
      username,
      password
    );
    return { token, userInfo };
  }
}
