import { Store } from "@/stores/types";
import { Peer } from "peerjs";
import React, {
  ComponentType,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { UtilContext } from "./withUtils";

interface CallContextValue {
  callUser: (userID: string) => void;
}

export const CallContext = React.createContext({} as CallContextValue);
export default (_Component: ComponentType) => {
  let peer: Peer;
  return (props: ComponentType["propTypes"]) => {
    const component = useMemo(() => <_Component {...props} />, [props]);
    const callElement = useRef<HTMLDivElement>(null);
    const userID = useSelector((state: Store) => state.main.userInfo?.userID);
    const utils = useContext(UtilContext);
    const call = useMemo<CallContextValue>(
      () => ({
        callUser(userID) {
          utils.showToast(
            <div ref={callElement} className="w-4/5 h-4/5 bg-red-300">
              <video id="me" autoPlay controls></video>
              <video id="he" autoPlay controls></video>
            </div>,
            false,
            -1
          );
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              const myVideo = callElement.current?.querySelector(
                "#me"
              ) as HTMLVideoElement;
              myVideo.srcObject = stream;
              myVideo.play();
              const call = peer.call(`bea-chat-${userID}`, stream);
              call.on("stream", function (remoteStream) {
                const hisVideo = callElement.current?.querySelector(
                  "#he"
                ) as HTMLVideoElement;
                hisVideo.srcObject = remoteStream;
                hisVideo.play();
              });
            })
            .catch(() => {
              utils.showToast("无法调用摄像头，呼叫失败");
            });
        },
      }),
      []
    );

    useEffect(() => {
      if (!peer) {
        peer = new Peer(`bea-chat-${userID}`);
        peer.on("call", (call) => {
          utils.showToast(
            <div ref={callElement} className="w-4/5 h-4/5 bg-red-300">
              <video id="me" autoPlay controls></video>
              <video id="he" autoPlay controls></video>
            </div>,
            false,
            -1
          );
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              const myVideo = callElement.current?.querySelector(
                "#me"
              ) as HTMLVideoElement;
              myVideo.srcObject = stream;
              myVideo.play();
              call.answer(stream);
              call.on("stream", function (remoteStream) {
                const hisVideo = callElement.current?.querySelector(
                  "#he"
                ) as HTMLVideoElement;
                hisVideo.srcObject = remoteStream;
                hisVideo.play();
              });
            })
            .catch(() => {
              utils.showToast("无法调用摄像头，接听失败");
            });
        });
      }
    }, []);

    return (
      <CallContext.Provider value={call}>{component}</CallContext.Provider>
    );
  };
};
