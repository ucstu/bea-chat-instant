import { MainState } from "./main";
import { MessageState } from "./message";

export interface Store {
  main: MainState;
  message: MessageState;
}
