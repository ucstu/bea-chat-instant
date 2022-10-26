import { UserInfo } from "@/apis";
import { Store } from "@/stores/types";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Peer } from "peerjs";
import React, {
  ComponentType,
  LegacyRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { UtilContext } from "./withUtils";

interface CallContextValue {
  callUser: (userID: UserInfo) => void;
}

export const CallContext = React.createContext({} as CallContextValue);
export default (_Component: ComponentType) => {
  let peer: Peer;
  return (props: ComponentType["propTypes"]) => {
    const component = useMemo(() => <_Component {...props} />, [props]);
    const userInfo = useSelector((state: Store) => state.main.userInfo!);
    const contacts = useSelector((state: Store) => state.main.contacts);
    const container = useRef<HTMLDivElement>(null);
    const utils = useContext(UtilContext);

    const call = useMemo<CallContextValue>(
      () => ({
        callUser(_userInfo) {
          const bridge = {} as { stream: MediaStream };
          utils.showVideoCall(
            <VideoView
              ref={container}
              onCancel={() => {
                bridge?.stream.getTracks().forEach((track) => track.stop());
                utils.hiddenVideoCall();
              }}
            />
          );
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              bridge.stream = stream;
              setStream(container.current!, "me", stream);
              const call = peer.call(`bea-chat-${_userInfo.userID}`, stream);
              call.on("stream", function (stream) {
                setStream(container.current!, "he", stream);
              });
            })
            .catch(() => {
              utils.hiddenVideoCall();
              utils.showToast("无法调用摄像头，呼叫失败");
            });
        },
      }),
      []
    );

    useEffect(() => {
      if (!peer) {
        peer = new Peer(`bea-chat-${userInfo.userID}`);
        peer.on("call", (call) => {
          const bridge = {} as { stream: MediaStream };
          utils.showVideoCall(
            <VideoView
              ref={container}
              onCancel={() => {
                bridge?.stream.getTracks().forEach((track) => track.stop());
                utils.hiddenVideoCall();
              }}
            />
          );
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              bridge.stream = stream;
              setStream(container.current!, "me", stream);
              call.answer(stream);
              call.on("stream", function (stream) {
                setStream(container.current!, "he", stream);
              });
            })
            .catch(() => {
              utils.hiddenVideoCall();
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

function setStream(node: HTMLDivElement, name: string, stream: MediaStream) {
  const videoNode = node.querySelector(`#${name}`) as HTMLVideoElement;
  videoNode.srcObject = stream;
}

export interface VideoViewProps {
  onCancel: () => void;
}
const VideoView = React.memo(
  React.forwardRef(
    ({ onCancel }: VideoViewProps, ref: LegacyRef<HTMLDivElement>) => (
      <div
        ref={ref}
        className="w-full h-full fixed top-0 left-0 bg-black shadow-md shadow-black"
      >
        <video
          id="me"
          autoPlay
          className="absolute right-2 top-8 w-2/5 rounded-lg"
        ></video>
        <video
          id="he"
          autoPlay
          className="h-full absolute top-0 left-0"
        ></video>
        <div className="w-full h-20 absolute bottom-10 flex justify-center">
          <FontAwesomeIcon
            icon={faPhone}
            onClick={onCancel}
            className="h-10 p-5 aspect-square rounded-full pointer-events-auto bg-red-500"
          />
        </div>
      </div>
    )
  )
);