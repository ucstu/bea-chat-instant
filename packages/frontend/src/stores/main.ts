import { PartialExcluded } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MainState, UserInfo } from "./types/main";

const initialState: MainState = {
  contacts: {
    "123": {
      userID: "123",
      name: "张三",
      avatar:
        "https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2",
    },
    "456": {
      userID: "456",
      name: "张三",
      avatar:
        "https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2",
    },
    "789": {
      userID: "789",
      name: "张三",
      avatar:
        "https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2",
    },
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    addContact(state, action: PayloadAction<UserInfo>) {
      if (state.contacts[action.payload.userID])
        throw new Error(
          "这个联系人已经在用户的联系人列表中了，请不要重复添加。"
        );
      state.contacts[action.payload.userID] = action.payload;
    },
    patchContact(
      state,
      action: PayloadAction<PartialExcluded<UserInfo, "userID">>
    ) {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (!state.contacts[action.payload.userID])
        throw new Error("这个联系人不在用户的联系人列表中，请先添加该用户。");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.contacts[action.payload.userID] = {
        ...state.contacts[action.payload.userID],
        ...action.payload,
      };
    },
    removeContact(state, action: PayloadAction<string>) {
      if (!state.contacts[action.payload])
        throw new Error(
          "这个联系人不在用户的联系人列表中，无法删除该用户，请考虑是否有重复删除。"
        );
      delete state.contacts[action.payload];
    },
    setContacts(state, action: PayloadAction<Array<UserInfo>>) {
      state.contacts = Object.fromEntries(
        action.payload.map((userInfo) => [userInfo.userID, userInfo])
      );
    },
  },
  extraReducers: {},
});

export const {
  setToken,
  setUserInfo,
  addContact,
  patchContact,
  removeContact,
  setContacts,
} = mainSlice.actions;

export default mainSlice.reducer;
