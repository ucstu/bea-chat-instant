export interface UserInfo {
  /* 用户名 */
  name: string;
  /* 用户头像 */
  avatar: string;
  /* 用户ID */
  userID: string;
}

export interface MainState {
  /* 用户Token */
  token?: string;
  /* 用户信息 */
  userInfo?: UserInfo;
  /* 用户联系人 */
  contacts: {
    [x: string]: UserInfo;
  };
}
