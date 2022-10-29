import { UserInfo } from "@/apis";

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
