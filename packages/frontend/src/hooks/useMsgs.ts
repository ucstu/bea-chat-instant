import { Store } from "@/stores/types";
import { useSelector } from "react-redux";

export default function useMsgs(userID: string) {
  const msg = useSelector((state: Store) => state.message[userID]);
  return msg;
}
