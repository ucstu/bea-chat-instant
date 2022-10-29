/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserInfo = {
  description: `用户信息`,
  properties: {
    userID: {
      type: "string",
      description: `用户ID`,
      isRequired: true,
    },
    name: {
      type: "string",
      description: `用户名称`,
      isRequired: true,
    },
    avatar: {
      type: "string",
      description: `头像地址`,
      isRequired: true,
    },
  },
} as const;
