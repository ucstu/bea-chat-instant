import { MailContext } from "@/hocMethods/withMail";
import { useContext } from "react";

export default function useMail() {
  const mail = useContext(MailContext);
  return mail;
}
