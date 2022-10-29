import { Message } from "@/apis";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "./types/message";

const initialState: MessageState = {};

export const mainSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addLocalMessage(state, action: PayloadAction<Message>) {
      const { receiverID } = action.payload;
      if (!state[receiverID]) state[receiverID] = [];
      state[receiverID].push({ ...action.payload, readied: false });
    },
    addRemoteMessage(state, action: PayloadAction<Message>) {
      const { senderID } = action.payload;
      if (!state[senderID]) state[senderID] = [];
      state[senderID].push({ ...action.payload, readied: false });
    },
    readAllRemoteMessage(state, action: PayloadAction<string>) {
      const senderID = action.payload;
      if (!state[senderID]) state[senderID] = [];
      state[senderID].forEach((message) => (message.readied = true));
    },
  },
});

export const { addRemoteMessage, addLocalMessage, readAllRemoteMessage } =
  mainSlice.actions;

export default mainSlice.reducer;
