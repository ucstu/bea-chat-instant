import { setMessage } from "@/stores/message";
import { Store } from "@/stores/types";
import { Message } from "@bea-chat/api";
import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface MailContextValue {
  sendMessage: (message: Omit<Message, "senderID">) => void;
  connected: boolean;
}

export const MailContext = React.createContext({} as MailContextValue);
export default (_Component: ComponentType) => {
  let socket: Socket;
  return (props: ComponentType["propTypes"]) => {
    const component = useMemo(() => <_Component {...props} />, [props]);
    const userID = useSelector((state: Store) => state.main.userInfo?.userID);
    const token = useSelector((state: Store) => state.main.token);
    const [connected, setConnected] = useState(false);
    const dispatch = useDispatch();
    const mail = useMemo<MailContextValue>(
      () => ({
        sendMessage(message) {
          socket.emit("msg", { ...message, senderID: userID });
        },
        connected,
      }),
      [connected, socket]
    );

    useEffect(() => {
      if (socket) {
        socket.close();
      }
      socket = io(import.meta.env.VITE_BASE_URL, {
        auth: {
          token: token,
        },
      });
      socket.on("connect", () => {
        setConnected(socket.connected);
      });
      socket.on("msg", (message) => {
        dispatch(setMessage(message));
      });
      socket.on("disconnect", () => {
        setConnected(socket.connected);
      });
      return () => {
        socket.close();
      };
    }, [token]);

    return (
      <MailContext.Provider value={mail}>{component}</MailContext.Provider>
    );
  };
};
