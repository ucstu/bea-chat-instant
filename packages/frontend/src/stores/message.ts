import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "./types/message";
import { Message } from "./types/message";

const initialState: MessageState = {
  "123": [
    {
      dateTime: "2021-10-20 00:34:00",
      content: "hello",
      msgType: Message.MessageType.Text,
      readied: false,
    },
    {
      dateTime: "2021-11-20 00:34:00",
      content: "world",
      msgType: Message.MessageType.Text,
      readied: false,
    },
  ],
  "456": [
    {
      dateTime: "2021-10-21 07:34:00",
      content: "hello",
      msgType: Message.MessageType.Text,
      readied: false,
    },
    {
      dateTime: "2021-11-22 08:34:00",
      content: "world",
      msgType: Message.MessageType.Text,
      readied: false,
    },
  ],
  "789": [
    {
      dateTime: "2021-10-19 12:34:00",
      content: "hello",
      msgType: Message.MessageType.Text,
      readied: false,
    },
    {
      dateTime: "2021-11-19 14:34:00",
      content: "world",
      msgType: Message.MessageType.Text,
      readied: false,
    },
  ],
};

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
