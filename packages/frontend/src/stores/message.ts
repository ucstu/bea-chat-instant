import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "./types/message";
import { Message } from "./types/message";

const initialState: MessageState = {};

type SetMessageAction = PayloadAction<{
  userID: string;
  message: Message;
}>;
export const mainSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: SetMessageAction) {
      const { userID, message } = action.payload;
      if (!state[userID]) state[userID] = [];
      state[userID].push({ ...message, readied: false });
    },
  },
});

export const { setMessage } = mainSlice.actions;

export default mainSlice.reducer;
