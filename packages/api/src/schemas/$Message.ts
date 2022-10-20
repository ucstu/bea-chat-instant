/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Message = {
  properties: {
    dateTime: {
      type: "string",
      description: `发送时间`,
      isRequired: true,
    },
    msgType: {
      type: "Enum",
      isRequired: true,
    },
    content: {
      type: "string",
      description: `消息内容`,
      isRequired: true,
    },
    readied: {
      type: "boolean",
      description: `已读状态`,
      isRequired: true,
    },
  },
} as const;
