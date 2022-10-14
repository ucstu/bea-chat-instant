export interface UserInfo {
  name: string;
  avatar: string;
  userId: string;
}

export interface MainState {
  token?: string;
  userInfo?: UserInfo;
}

export interface Store {
  main: MainState;
}
