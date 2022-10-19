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

type FilterOptional<T> = Pick<
  T,
  Exclude<
    {
      [K in keyof T]: T extends Record<K, T[K]> ? K : never;
    }[keyof T],
    undefined
  >
>;

type FilterNotOptional<T> = Pick<
  T,
  Exclude<
    {
      [K in keyof T]: T extends Record<K, T[K]> ? never : K;
    }[keyof T],
    undefined
  >
>;

type PartialEither<T, K extends keyof any> = { [P in Exclude<keyof FilterOptional<T>, K>]-?: T[P] } &
  { [P in Exclude<keyof FilterNotOptional<T>, K>]?: T[P] } &
  { [P in Extract<keyof T, K>]?: undefined };

type Object = {
  [name: string]: any;
};

export type EitherOr<O extends Object, L extends string, R extends string> =
  (
    PartialEither<Pick<O, L | R>, L> |
    PartialEither<Pick<O, L | R>, R>
  ) & Omit<O, L | R>;
