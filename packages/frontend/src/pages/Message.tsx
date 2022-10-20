import Header from "@/components/Header";
import type { UserInfo } from "@/stores/types/main";
import type {
  Message as MessageType,
  MessageState,
} from "@/stores/types/message";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Message.module.scss";

export default function Message() {
  // !这是一个键为对方用户ID的对象 (作用等同于Map)
  const messages = useSelector((state: MessageState) => state);
  const navigate = useNavigate();
  const gotoChat = useCallback((userID: string) => {
    navigate(`/chart/"${userID}`);
  }, []);

  return (
    <>
      <Header
        middle={<img alt="Bea" src="bea.svg" className="h-50" />}
        right={<FontAwesomeIcon icon={faAdd} size="xl" className="mr-10" />}
      />
      <div className={styles.message}>
        {Object.entries(messages).map(([userID, messages]) => (
          <MessageItem
            key={userID}
            userId={userID}
            messages={messages}
            onClick={gotoChat}
          />
        ))}
      </div>
    </>
  );
}

interface MessageItemProp {
  userId: UserInfo["userId"];
  messages: Array<MessageType>;
  onClick: (userID: string) => void;
}
const MessageItem = React.memo(
  ({ userId, messages, onClick: gotoChat }: MessageItemProp) => {
    return (
      <div className={styles.messageItem} onClick={() => gotoChat(userId)}>
        <div className="p">
          <img
            className={styles.messageItemAvatar}
            src="https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
            alt="avatar"
          />
        </div>
        <div className={styles.messageItemRight}>
          <div className="userName">姓名</div>
          <div className={styles.messageItemContent}>
            聊天内容第四u烦恼是富士康返回非凡的四点九四但是
          </div>
        </div>
      </div>
    );
  }
);
