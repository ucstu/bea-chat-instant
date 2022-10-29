import { UserInfo } from "@/entities/UserInfo";
import { HttpResponse } from "@/models/HttpResponse";
import { UserService } from "@/services/UserService";
import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

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
  userInfo: Omit<UserInfo, "password">;
}

@Controller()
export class UserController {
  constructor(
    private readonly loginService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Post("/login")
  async login(
    @Body() { username, password }: AuthModel,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthReturnModel | HttpResponse> {
    const result = await this.loginService.login(username, password);
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
      return result;
    }
    return { token: this.jwtService.sign({ ...result }), userInfo: result };
  }

  @Post("/register")
  async register(
    @Body() { username, password }: AuthModel,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthReturnModel | HttpResponse> {
    const result = await this.loginService.register(username, password);
    if ("code" in result) {
      res.status(Math.floor(result.code / 100));
      return result;
    }
    return {
      token: this.jwtService.sign({ ...result }),
      userInfo: result,
    };
  }

  @Get("/search")
  async searchUser(@Query("username") username: string) {
    return this.loginService.searchUser(username);
  }
}
