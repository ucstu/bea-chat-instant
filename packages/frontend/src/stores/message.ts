import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "./types/message";
import { Message } from "./types/message";

const initialState: MessageState = {};

type SetMessageAction = PayloadAction<Message>;
export const mainSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: SetMessageAction) {
      const { senderID } = action.payload;
      if (!state[senderID]) state[senderID] = [];
      state[senderID].push({ ...action.payload, readied: false });
    },
  },
});

export const { setMessage } = mainSlice.actions;

export default mainSlice.reducer;
