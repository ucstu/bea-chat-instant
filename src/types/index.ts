import type { Dayjs } from "dayjs";

export interface UserInfo {
  name: string;
  avatar: string;
  userId: string;
}

export namespace Message {
  export enum MessageType {}
}

export interface Message {
  dateTime: Dayjs;
  msgType: Message.MessageType;
  content: string;
  animation: boolean;
}

export interface MainState {
  token?: string;
  userInfo?: UserInfo;
  contacts?: Array<UserInfo>;
}

export interface MessageState {
  [x: string]: Array<Message>;
}

export interface Store {
  main: MainState;
}
