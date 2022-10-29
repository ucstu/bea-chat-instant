/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserInfo } from "../models/UserInfo";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class Service {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 新增联系人
   * @returns any 成功
   * @throws ApiError
   */
  public addContacts({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户ID
       */
      userID: string;
      /**
       * 用户名称
       */
      name: string;
      /**
       * 头像地址
       */
      avatar: string;
    };
  }): CancelablePromise<{
    /**
     * 成功编码
     */
    code: number;
    /**
     * 成功描述
     */
    msg: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/contacts",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有联系人
   * @returns UserInfo 成功
   * @throws ApiError
   */
  public queryContacts({
    size,
    page,
    current,
    where,
    fields,
    sort,
  }: {
    /**
     * 单页数量
     */
    size?: number;
    /**
     * 当前页数
     */
    page?: number;
    /**
     * 联系人ID
     */
    current?: string;
    /**
     * 查询条件
     */
    where?: Array<string>;
    /**
     * 查询字段
     */
    fields?: Array<string>;
    /**
     * 排序方式
     */
    sort?: Array<string>;
  }): CancelablePromise<Array<UserInfo>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/contacts",
      query: {
        size: size,
        page: page,
        current: current,
        where: where,
        fields: fields,
        sort: sort,
      },
    });
  }

  /**
   * 删除联系人
   * @returns any 成功
   * @throws ApiError
   */
  public deleteContacts({
    contactId,
  }: {
    /**
     * 联系人ID
     */
    contactId: string;
  }): CancelablePromise<{
    /**
     * 成功编码
     */
    code: number;
    /**
     * 成功描述
     */
    msg: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/contacts/{contact_id}",
      path: {
        contact_id: contactId,
      },
    });
  }

  /**
   * 修改联系人
   * @returns any 成功
   * @throws ApiError
   */
  public updateContact({
    contactId,
    requestBody,
  }: {
    /**
     * 联系人ID
     */
    contactId: string;
    requestBody?: {
      /**
       * 用户名称
       */
      name: string;
      /**
       * 头像地址
       */
      avatar: string;
    };
  }): CancelablePromise<{
    /**
     * 成功编码
     */
    code: number;
    /**
     * 成功描述
     */
    msg: string;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/contacts/{contact_id}",
      path: {
        contact_id: contactId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询联系人
   * @returns UserInfo 成功
   * @throws ApiError
   */
  public queryContact({
    contactId,
    fields,
  }: {
    contactId: string;
    /**
     * 查询字段，数组
     */
    fields?: Array<string>;
  }): CancelablePromise<UserInfo> {
    return this.httpRequest.request({
      method: "GET",
      url: "/contacts/{contact_id}",
      path: {
        contact_id: contactId,
      },
      query: {
        fields: fields,
      },
    });
  }
}
