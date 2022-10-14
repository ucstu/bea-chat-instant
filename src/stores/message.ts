import type { MainState, UserInfo } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MainState = {
  token: "12",
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
  },
});

export const { setToken, setUserInfo } = mainSlice.actions;

export default mainSlice.reducer;
