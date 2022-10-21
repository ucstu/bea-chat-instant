import { useRef, useState } from "react";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
const itemArr = [
  {
    options: [
      { name: "账号与安全" },
      { name: "青少年模式" },
      { name: "关怀模式" },
    ],
  },
  {
    category: "隐私",
    options: [
      { name: "个人信息与权限" },
      { name: "个人信息收集清单" },
      { name: "第三方信息共享清单" },
    ],
  },
];
export default function set() {
  const [isShow, setIsShow] = useState(false);
  const nodeRef = useRef(null);
  const maskNode = useRef(null);
  function clickQuit() {
    const show = !isShow;
    setIsShow(show);
    (nodeRef.current as unknown as HTMLElement).style.backgroundColor =
      "#e6e3e3";
    setTimeout(() => {
      (nodeRef.current as unknown as HTMLElement).style.backgroundColor =
        "#fdfdfd";
    }, 200);
    (maskNode.current as unknown as HTMLElement).style.display = "block";
  }
  function cancelQuit() {
    (maskNode.current as unknown as HTMLElement).style.display = "none";
  }
  return (
    <div className="relative" style={{ height: "100vh", width: "100vw" }}>
      <Header title="设置" />
      <ItemCard configure={itemArr} />
      <div className="w-full text-center absolute bottom-0">
        <button
          className="w-full h-40 mt-5"
          style={{ border: 0, padding: 0, backgroundColor: "#fdfdfd" }}
          disabled
        >
          切换账号
        </button>
        <div
          className="w-full h-40 mt-5 leading-40 "
          style={{ backgroundColor: "#fdfdfd" }}
          onClick={clickQuit}
          ref={nodeRef}
        >
          退出
        </div>
      </div>
      {/* {quit遮罩层 弹出选项框框} */}
      <div style={{ display: "none" }} ref={maskNode}>
        <div
          className="absolute h-full w-full bottom-0 "
          style={{ backgroundColor: "#eee", opacity: 0.5 }}
        ></div>
        <div
          className="absolute  leading-40 w-full text-center bottom-0 "
          style={{
            fontWeight: "bold",
            backgroundColor: "#fdfdfd",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <div>
            <div>退出登录</div>
            <div>关闭微信</div>
            <div onClick={cancelQuit}>取消</div>
          </div>
        </div>
      </div>
    </div>
  );
}
