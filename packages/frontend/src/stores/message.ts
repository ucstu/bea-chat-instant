import { Message } from "@/apis";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "./types/message";

const initialState: MessageState = {};

export const mainSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<Message>) {
      const { senderID } = action.payload;
      if (!state[senderID]) state[senderID] = [];
      state[senderID].push({ ...action.payload, readied: false });
    },
  },
});

export const { setMessage } = mainSlice.actions;

export default mainSlice.reducer;
