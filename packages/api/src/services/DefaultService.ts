/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserInfo } from "../models/UserInfo";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class DefaultService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 用户登录
   * @returns any 成功
   * @throws ApiError
   */
  public postLogin({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名称
       */
      username: string;
      /**
       * 登录密码
       */
      password: string;
    };
  }): CancelablePromise<{
    /**
     * 登陆令牌
     */
    token: string;
    /**
     * 用户信息
     */
    userInfo: UserInfo;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/login",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `请求有误`,
      },
    });
  }

  /**
   * 用户注册
   * @returns any 成功
   * @throws ApiError
   */
  public postRegister({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名称
       */
      username: string;
      /**
       * 登录密码
       */
      password: string;
    };
  }): CancelablePromise<{
    /**
     * 登陆令牌
     */
    token: string;
    /**
     * 用户信息
     */
    userInfo: UserInfo;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/register",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `请求有误`,
      },
    });
  }
}
