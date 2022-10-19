import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Message.module.scss";
export default function Message() {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6]);
  const userId = 123;
  const navigate = useNavigate();
  function intoChartPage() {
    navigate("/chart/" + userId);
  }

  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);

  return (
    <div ref={nodeRef} className={styles.message} onClick={intoChartPage}>
      {list.map((item, index) => {
        return <MessageItem key={index} />;
      })}
    </div>
  );
}

function MessageItem() {
  return (
    <div className={styles.messageItem}>
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
