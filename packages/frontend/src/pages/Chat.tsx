import { Message, UserInfo } from "@/apis";
import Header from "@/components/Header";
import useCall from "@/hooks/useCall";
import useMail from "@/hooks/useMail";
import useMsgs from "@/hooks/useMsgs";
import useUInfo from "@/hooks/useUInfo";
import useUtils from "@/hooks/useUtils";
import { Store } from "@/stores/types";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Chart() {
  const { sendMessage } = useMail();
  const { callUser } = useCall();
  const navigate = useNavigate();
  const utils = useUtils();
  const [messageContent, SetMessageContent] = useState("");
  const nodeRef = useRef(null);
  const { userID } = useParams();
  const messages = useMsgs(userID!);
  const userInfo = useUInfo(userID!);
  const ownInfo = useSelector((state: Store) => state.main.userInfo);
  const myMessages = useMsgs((ownInfo as UserInfo).userID!);
  const displayNode = useRef(null);
  const counter = compare().length;
  useEffect(() => {
    if (!userID) {
      utils.showToast("发生了一些错误，已回退");
      navigate(-1);
      return;
    }
  }, [userID]);
  // 筛选数据 到一个数组 添加后缀 区别聊天双方
  function compare() {
    let newArr: string[] = [];
    let sendMyMessages: Message[] = [];
    let mySendMessages: Message[] = [];
    let flag: number;
    let n = 0;
    let m = 0;
    let i;
    if (myMessages) {
      mySendMessages = myMessages.filter((item) => item.receiverID === userID);
    }
    if (messages) {
      sendMyMessages = messages.filter(
        (item) => item.receiverID === ownInfo?.userID
      );
    }

    if (userID === ownInfo?.userID) {
      return newArr.concat(
        mySendMessages.map((item) => item.content.concat("my"))
      );
    }
    if (mySendMessages.length === 0) {
      newArr = newArr.concat(
        sendMyMessages.map((item) => item.content.concat("other"))
      );
    }
    for (i = m; i < mySendMessages.length; i++) {
      for (let j = n; j < sendMyMessages.length; j++) {
        const other = sendMyMessages[j];
        if (mySendMessages[i] && other) {
          const time = dayjs(mySendMessages[i].dateTime).diff(
            dayjs(other.dateTime)
          );
          if (time >= 0) {
            newArr.push(other.content.concat("other"));
            n = j;

            if (j === sendMyMessages.length - 1) {
              flag = i;
              n = sendMyMessages.length;
            }
          } else {
            newArr.push(mySendMessages[i].content.concat("my"));
            m = i++;

            if (!(m >= mySendMessages.length)) {
              if (n) j = n;
              else j = 0;
            } else n = sendMyMessages.length;
          }
        } else {
          newArr.push(other.content.concat("other"));
        }
      }
    }
    if (!(i >= mySendMessages.length)) {
      newArr.push(mySendMessages[i].content.concat("my"));
      m = mySendMessages.length;
    }
    if (flag)
      newArr = newArr.concat(
        mySendMessages.slice(flag).map((item) => item.content.concat("my"))
      );

    return newArr;
  }
  // 查看后缀 区别双方 调用对应组件
  function CompareEndings(props: any) {
    const { contentArr } = props;

    const componentArr = [];
    for (let i = 0; i < contentArr.length; i++) {
      const element = contentArr[i];

      if (element.endsWith("my")) {
        componentArr.push(
          <RightMessageItem
            content={element.split("my")[0]}
            avatar={ownInfo?.avatar}
            key={i}
          />
        );
      } else
        componentArr.push(
          <LeftMessageItem
            content={element.split("other")[0]}
            avatar={ownInfo?.avatar}
            key={i}
          />
        );
    }

    return <Fragment>{componentArr}</Fragment>;
  }
  // 自己的聊天框
  const RightMessageItem = (props: any) => {
    const { content, avatar } = props;

    return (
      <div>
        <div className=" h-10 leading-10  flex mt-3 flex mb-3">
          <div style={{ flexGrow: "1" }}></div>
          <div className=" bg-gray-500 rounded-md h-10 leading-6 p-2">
            {content}
          </div>

          <img
            className="h-10 w-10 rounded-lg ml-3 mr-3"
            src={avatar}
            alt="avatar"
          />
        </div>
      </div>
    );
  };
  // 别人的聊天框
  const LeftMessageItem = (props: any) => {
    const { content, avatar } = props;

    return (
      <div>
        <div className=" h-10 leading-10  flex mt-3 flex mb-3">
          <img
            className="h-10 w-10 rounded-lg ml-3 mr-3"
            src={avatar}
            alt="avatar"
          />
          <div className=" bg-gray-500 rounded-md h-10 leading-6 p-2">
            {content}
          </div>
          <div style={{ flexGrow: "1" }}></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    (displayNode.current as unknown as HTMLElement).scrollTo(0, 64 * counter);
  }, [counter]);

  return (
    <div className="overflow-hidden">
      <Header
        left={
          <FontAwesomeIcon icon={faCaretLeft} onClick={() => navigate(-1)} />
        }
        title={userInfo?.name || "用户"}
      />
      {/* <button onClick={() => callUser(userInfo!)}>打电话</button> */}
      <div
        style={{
          height: "calc(100vh - 96px)",
          position: "relative",
          overflow: "scroll",
        }}
        ref={displayNode}
      >
        <CompareEndings contentArr={compare()} />
      </div>
      <div>
        {/* {输入块} */}
        <div className="absolute bg-slate-500 bottom-0 h-12 flex w-full">
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
                  content: (nodeRef.current as unknown as HTMLInputElement)
                    .value,
                  dateTime: dayjs().toISOString(),
                  readied: false,
                });

              SetMessageContent(
                (nodeRef.current as unknown as HTMLInputElement).value
              );
              (nodeRef.current as unknown as HTMLInputElement).value = "";
            }}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
