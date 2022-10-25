import { setMessage } from "@/stores/message";
import { Store } from "@/stores/types";
import { Message } from "@bea-chat/api";
import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface MailContextValue {
  sendMessage: (message: Omit<Message, "senderID">) => void;
  // onSignal: (callback: (signal: string) => void) => () => void;
  connected: boolean;
}

export const MailContext = React.createContext({} as MailContextValue);
export default (_Component: ComponentType) => {
  let socket: Socket;
  // let onSignalCallback: ((signal: string) => void) | null;
  return (props: ComponentType["propTypes"]) => {
    const component = useMemo(() => <_Component {...props} />, [props]);
    const userID = useSelector((state: Store) => state.main.userInfo?.userID);
    const token = useSelector((state: Store) => state.main.token);

    const [connected, setConnected] = useState(false);
    const dispatch = useDispatch();
    const mail = useMemo<MailContextValue>(
      () => ({
        sendMessage(_message) {
          const message = { ..._message, senderID: userID!, readied: true };
          socket.emit("msg", message);
          dispatch(setMessage(message));
        },
        // onSignal(callback) {
        //   onSignalCallback = callback;
        //   return () => (onSignalCallback = null);
        // },
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
      socket.on("msg", (message: Message) => {
        // if (message.msgType === 5) {
        //   onSignalCallback?.(message.content);
        //   return;
        // }
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
