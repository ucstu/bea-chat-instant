export namespace Message {
  export enum MessageType {
    Text,
    Image,
    Audio,
    Video,
    File,
  }
}

export interface Message {
  /* 消息时间 */
  dateTime: string;
  /* 消息类型 */
  msgType: Message.MessageType;
  /* 消息内容 */
  content: string;
  /* 已读状态 */
  readied: boolean;
}

export interface MessageState {
  [x: string]: Array<Message>;
}
