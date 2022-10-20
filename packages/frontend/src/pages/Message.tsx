import Header from "@/components/Header";
import type { Store } from "@/stores/types";
import type { UserInfo } from "@/stores/types/main";
import type { Message as MessageType } from "@/stores/types/message";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Message.module.scss";

export default function Message() {
  // !这是一个键为对方用户ID的对象 (作用等同于Map)
  const messages = useSelector((store: Store) => store.message);
  const contacts = useSelector((store: Store) => store.main.contacts);
  const navigate = useNavigate();
  const gotoChat = useCallback((userID: string) => {
    navigate(`/chart/"${userID}`);
  }, []);

  return (
    <>
      <Header
        middle={<img alt="Bea" src="bea.svg" className="h-12" />}
        right={<FontAwesomeIcon icon={faAdd} size="xl" className="mr-5" />}
      />
      <div className={styles.message}>
        {Object.entries(messages).map(
          ([userID, messages]) =>
            contacts[userID] && (
              <MessageItem
                key={userID}
                userInfo={contacts[userID]}
                messages={messages}
                onClick={gotoChat}
              />
            )
        )}
      </div>
    </>
  );
}

interface MessageItemProp {
  userInfo: UserInfo;
  messages: Array<MessageType>;
  onClick: (userID: string) => void;
}
const MessageItem = React.memo(
  ({ userInfo, messages, onClick: gotoChat }: MessageItemProp) => {
    const notReadiedMessages = messages.filter((message) => !message.readied);
    return (
      <div
        className={styles.messageItem}
        onClick={() => gotoChat(userInfo.userID)}
      >
        <div className="">
          <img
            className={styles.messageItemAvatar}
            src={userInfo.avatar}
            alt={userInfo.name}
          />
        </div>
        <div className={styles.messageItemRight}>
          <div className="userName">{userInfo.name}</div>
          <div className={styles.messageItemContent}>
            {notReadiedMessages[notReadiedMessages.length - 1].content}
          </div>
        </div>
      </div>
    );
  }
);
