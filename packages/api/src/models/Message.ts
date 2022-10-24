/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 用户消息
 */
export type Message = {
  /**
   * 发起者ID
   */
  senderID: string;
  /**
   * 接收者ID
   */
  receiverID: string;
  /**
   * 发送时间
   */
  dateTime: string;
  /**
   * 消息类型
   */
  msgType: Message.msgType;
  /**
   * 消息内容
   */
  content: string;
  /**
   * 已读状态
   */
  readied: boolean;
};

export namespace Message {
  /**
   * 消息类型
   */
  export enum msgType {
    Text = 1,
    Image = 2,
    Audio = 3,
    Video = 4,
    File = 5,
  }
}
