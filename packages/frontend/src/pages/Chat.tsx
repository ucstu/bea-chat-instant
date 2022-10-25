import Header from "@/components/Header";
import { CallContext } from "@/hocMethods/withCall";
import { MailContext } from "@/hocMethods/withMail";
import { UtilContext } from "@/hocMethods/withUtils";
import type { Store } from "@/stores/types";
import { Message } from "@bea-chat/api";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

export default function Chart() {
  const contacts = useSelector((store: Store) => store.main.contacts);
  const { sendMessage } = useContext(MailContext);
  const { callUser } = useContext(CallContext);
  const utils = useContext(UtilContext);
  const { userID } = useParams();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const [isSend, setIsSend] = useState(false);
  const [messageContent, SetMessageContent] = useState("");
  const [position, setPosition] = useState(20);
  const userInfo = useMemo(
    () => (userID ? contacts[userID] : undefined),
    [userID, contacts]
  );

  useEffect(() => {
    if (!userID) {
      utils.showToast("发生了一些错误，已回退");
      navigate(-1);
    }
  }, [userID]);

  function MessageItem(props: any) {
    const { content, avatar } = props;
    console.log(props);

    return (
      <div
        className="h-6 leading-6 absolute flex"
        style={{ top: `${position}px` }}
      >
        <div className="flex h-10 leading-10 ">
          <div className=" bg-gray-500 rounded-md">{content}</div>
          {/* {小三角 对话框} */}
          <div
            className="w-0 h-0 bg-slate-400 self-center"
            style={{
              border: "8px solid yellow",
              borderColor: "transparent transparent yellow yellow ",
              borderRadius: "4px",
              transform: "rotate(-135deg)",
              transform: "translateY()",
            }}
          ></div>
        </div>
        <img
          className="h-10 w-10 rounded-lg"
          src="https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
          alt="avatar"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Header
        left={
          <FontAwesomeIcon icon={faCaretLeft} onClick={() => navigate(-1)} />
        }
        title={userInfo?.name || "用户"}
      />
      <div style={{ height: "calc(100vh - 96px)", position: "relative" }}>
        {isSend ? <MessageItem content={messageContent} /> : ""}
      </div>
      <div>
        <button onClick={() => callUser(userID!)}>打电话</button>
        {/* {输入块} */}
        <div className="absolute bg-slate-500 bottom-0 h-12 flex w-full">
          <input
            type="text"
            ref={nodeRef}
            className="p-0 m-0  h-10 self-center ml-2.5  "
            style={{ borderRadius: "6px", width: "calc(100vw - 70px)" }}
          />
          <button
            className="w-10 ml-2.5"
            onClick={() => {
              userID &&
                (nodeRef as unknown as HTMLInputElement).current.value &&
                sendMessage({
                  receiverID: userID,
                  msgType: Message.msgType.Text,
                  content: (nodeRef as unknown as HTMLInputElement).current
                    .value,
                  dateTime: dayjs().toISOString(),
                  readied: false,
                });
              setIsSend(true);
              SetMessageContent(
                (nodeRef as unknown as HTMLInputElement).current.value
              );
              (nodeRef as unknown as HTMLInputElement).current.value = "";
            }}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
