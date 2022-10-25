import Header from "@/components/Header";
import { MailContext } from "@/hocMethods/withMail";
import { UtilContext } from "@/hocMethods/withUtils";
import type { Store } from "@/stores/types";
import { Message } from "@bea-chat/api";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Chart() {
  const contacts = useSelector((store: Store) => store.main.contacts);
  const { connected, sendMessage } = useContext(MailContext);
  const utils = useContext(UtilContext);
  const { userID } = useParams();
  const navigate = useNavigate();

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

  return (
    <>
      <Header
        left={
          <FontAwesomeIcon icon={faCaretLeft} onClick={() => navigate(-1)} />
        }
        title={userInfo?.name || "用户"}
      />
      <div>
        {/* {输入块} */}
        <div className="absolute bg-slate-500 bottom-0 h-12 flex w-full">
          <input
            type="text"
            className="p-0 m-0 w-80 h-10 self-center ml-2  "
            style={{ borderRadius: "6px" }}
          />
          <button
            onClick={() =>
              userID &&
              sendMessage({
                receiverID: userID,
                msgType: Message.msgType.Text,
                content: "你好",
                dateTime: dayjs().toISOString(),
                readied: false,
              })
            }
          >
            发送
          </button>
        </div>
      </div>
    </>
  );
}
