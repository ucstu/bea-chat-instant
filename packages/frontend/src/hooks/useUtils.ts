import { UtilContext } from "@/hocMethods/withUtils";
import { useContext } from "react";

export default function useUtils() {
  const utils = useContext(UtilContext);
  return utils;
}
