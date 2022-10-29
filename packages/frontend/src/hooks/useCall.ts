import { CallContext } from "@/hocMethods/withCall";
import { useContext } from "react";

export default function useCall() {
  const call = useContext(CallContext);
  return call;
}
