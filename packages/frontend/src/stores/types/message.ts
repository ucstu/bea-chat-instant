import { Message } from "@/apis";

export interface MessageState {
  [x: string]: Array<Message>;
}
