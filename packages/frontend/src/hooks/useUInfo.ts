import { Store } from "@/stores/types";
import { useSelector } from "react-redux";

export default function useUInfo(userID: string) {
  const contacts = useSelector((store: Store) => store.main.contacts);
  return contacts[userID];
}
