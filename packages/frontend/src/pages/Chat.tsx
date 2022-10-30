import { Message } from "@/apis";
import boy from "@/assets/boy.fbx";
import happy from "@/assets/happy.fbx";
import phoneCall from "@/assets/phoneCall.fbx";
import praying from "@/assets/praying.fbx";
import standingClap from "@/assets/standingClap.fbx";
import thankful from "@/assets/thankful.fbx";
import Header from "@/components/Header";
import useCall from "@/hooks/useCall";
import useMail from "@/hooks/useMail";
import useMsgs from "@/hooks/useMsgs";
import useUInfo from "@/hooks/useUInfo";
import useUtils from "@/hooks/useUtils";
import { readAllRemoteMessage } from "@/stores/message";
import { Store } from "@/stores/types";
import { faBars, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Model, World } from "lingo3d-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default React.memo(() => {
  const ownInfo = useSelector((state: Store) => state.main.userInfo!);

  const { userID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useUInfo(userID!);
  const messages = useMsgs(userID!);
  const { sendMessage } = useMail();
  const { callUser } = useCall();
  const utils = useUtils();

  const displayNode = useRef(null);
  const nodeRef = useRef(null);

  const [animation, setAnimation] = useState<
    "happy" | "phoneCall" | "praying" | "standingClap" | "thankful" | ""
  >("");
  const [showToolBar, setShowToolBar] = useState(false);

  useEffect(() => {
    if (!userID) {
      utils.showToast("发生了一些错误，已回退");
      navigate(-1);
      return;
    }
  }, [userID]);

  useEffect(() => {
    if (!messages) return;
    dispatch(readAllRemoteMessage(userID!));
    (displayNode.current as unknown as HTMLElement).scrollTo(
      0,
      64 * (messages?.length || 0)
    );
    if (messages[messages.length - 1].content.includes("开心")) {
      setAnimation("happy");
    } else if (messages[messages.length - 1].content.includes("打电话")) {
      setAnimation("phoneCall");
    } else if (messages[messages.length - 1].content.includes("求求你")) {
      setAnimation("praying");
    } else if (messages[messages.length - 1].content.includes("鼓掌")) {
      setAnimation("standingClap");
    } else if (messages[messages.length - 1].content.includes("感谢")) {
      setAnimation("thankful");
    } else {
      setAnimation("");
    }
  }, [messages]);

  function base64(files: FileList) {
    const fileRead = new FileReader();
    fileRead.readAsDataURL(files[0]);
    fileRead.onload = () => {
      sendMessage({
        receiverID: userID!,
        msgType: Message.msgType.Text,
        content: fileRead.result as string,
        dateTime: dayjs().toISOString(),
        readied: false,
      });
    };
  }

  return (
    <div className="overflow-hidden relative " style={{ height: "100vh" }}>
      <Header
        left={
          <FontAwesomeIcon icon={faCaretLeft} onClick={() => navigate(-1)} />
        }
        title={userInfo?.name || "用户"}
        right={
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setShowToolBar(!showToolBar)}
          />
        }
      />
      {/* start: 弹出层 */}
      <div className={`${showToolBar ? "" : "hidden"} text-[#dfdfdf]`}>
        <div className=" absolute top-9 right-4 h-0 w-0 z-50 border-r-8 border-t-8 border-b-8 border-l-8 border-transparent border-b-slate-600 "></div>
        <div className="w-24 h-20 bg-slate-600 absolute top-12 right-2 rounded-md z-50">
          <div className="h-10 leading-10 text-center">
            <label htmlFor="picture">发送图片</label>
            <input
              type="file"
              name="picture"
              id="picture"
              multiple
              accept="image/*"
              className="h-0 w-0"
              onChange={(e) => base64(e.target.files!)}
            />
          </div>
          <div
            className="h-10 leading-10 text-center"
            onClick={() => {
              callUser(userInfo);
              setShowToolBar(false);
            }}
          >
            视频聊天
          </div>
        </div>
      </div>
      {/* end: 弹出层 */}
      {/* start: 消息列表 */}
      <div className="relative overflow-scroll" ref={displayNode}>
        {messages?.map((message, index) =>
          message.senderID === userInfo.userID ? (
            <MessageItem
              key={`${message.senderID}-${index}`}
              position="left"
              content={message.content}
              avatar={userInfo.avatar}
            />
          ) : (
            <MessageItem
              key={`${message.receiverID}-${index}`}
              position="right"
              content={message.content}
              avatar={ownInfo.avatar}
            />
          )
        )}
      </div>
      {/* end: 消息列表 */}
      <div
        className={`absolute bottom-0 ${
          animation === "" ? "invisible" : ""
        } left-0 w-20 h-32`}
      >
        <World color="#fff">
          <Model
            src={boy}
            animations={{
              happy,
              praying,
              thankful,
              phoneCall,
              standingClap,
            }}
            animation={animation}
            animationRepeat={false}
            onAnimationFinish={() => setAnimation("")}
          />
        </World>
      </div>
      {/* start: 输入块 */}
      <div className="absolute bg-slate-300 bottom-0 h-12 flex w-full">
        <input
          type="text"
          ref={nodeRef}
          className="p-0 m-0  h-10 self-center ml-2.5 rounded-md "
          style={{ width: "calc(100vw - 70px)" }}
        />
        <button
          className="w-10 ml-2.5"
          onClick={() => {
            userID &&
              (nodeRef.current as unknown as HTMLInputElement).value &&
              sendMessage({
                receiverID: userID,
                msgType: Message.msgType.Text,
                content: (nodeRef.current as unknown as HTMLInputElement).value,
                dateTime: dayjs().toISOString(),
                readied: false,
              });

            (nodeRef.current as unknown as HTMLInputElement).value = "";
          }}
        >
          发送
        </button>
      </div>
      {/* end: 输入块 */}
    </div>
  );
});

export interface MessageItemProps {
  position: "left" | "right";
  content: string;
  avatar: string;
}
// 聊天框
const MessageItem = (props: MessageItemProps) => {
  const { content, avatar, position } = props;
  return (
    <div
      className={`h-10 my-3 ${
        position === "right" ? "flex" : "flex flex-row-reverse"
      } leading-10`}
    >
      <div style={{ flexGrow: "1" }}></div>
      <div className="h-10 p-2 rounded-md leading-6 bg-gray-500">{content}</div>
      <img
        className="w-10 h-10 ml-3 mr-3 rounded-lg"
        src={avatar}
        alt="avatar"
      />
    </div>
  );
};
