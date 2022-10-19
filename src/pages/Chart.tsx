import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Chart() {
  const nodeRef = useRef<HTMLVideoElement>(null);
  function openVideo() {
    const a = navigator.mediaDevices;
    console.log(a);
  }
  return (
    <div className="overflow-hidden w-full h-full">
      <div className="h-300 w-full ">
        <div className="text-center w-full  h-50 leading-50 text-15 font-semibold bg-gray-100">
          <ChartObject></ChartObject>
        </div>
        <div style={{ height: "calc(100vh - 50px)", backgroundColor: "red" }}>
          <video ref={nodeRef}></video>
          <button onClick={openVideo}>按钮</button>
        </div>
      </div>
    </div>
  );
}

function ChartObject() {
  const navigate = useNavigate();
  function returnMain() {
    navigate("/message");
  }
  return (
    <div className="relative">
      <div className="absolute left-10 " onClick={returnMain}>
        返回
      </div>
      {/*此处‘left-10’没生效 */}
      <div>聊天对象</div>
    </div>
  );
}
