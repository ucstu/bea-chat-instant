import type { Store } from "@/stores/types";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
const itemArr = [
  {
    options: [
      { name: "收藏   stamp   msg" },
      { name: "朋友圈" },
      { name: "卡包" },
      { name: "表情" },
    ],
  },
];
export default function Mine() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: Store) => state.main.userInfo);
  return (
    <div style={{ backgroundColor: "#f9f9f9", height: "calc(100vh - 50px)" }}>
      {/* {个人信息头部} */}
      <div
        className=" flex  w-full  pl-2.5 pr-0.5 mb-2.5"
        style={{
          boxSizing: "border-box",
          height: "150px",
          backgroundColor: "#fdfdfd  ",
        }}
      >
        <div className=" items-center flex ml-2.5">
          <img
            className="h-14 w-14 rounded-lg "
            src={userInfo?.avatar}
            alt="avatar"
          />
        </div>
        <div className="ml-2.5 mt-11 leading-8">
          <div style={{ fontSize: "19px", fontWeight: "bolder" }}>
            {userInfo?.name}
          </div>
          <div
            style={{
              fontWeight: "bolder",
              color: "#707070",
              fontSize: "14px",
              width: "140px",
              height: "32px",
              overflow: "hidden",
            }}
          >
            微信号：{userInfo?.userID.split("-")[0]}
          </div>
        </div>
        <div
          className="flex h-20 items-center"
          style={{ marginLeft: "100px", marginTop: "50px", color: "#bfbfbf" }}
        >
          <FontAwesomeIcon icon={faQrcode} className="w-3.5 h-3.5" />
          <div className="ml-3 leading-10">{">"}</div>
        </div>
      </div>
      {/* {卡片item} */}
      <ItemCard configure={itemArr} />
      <div
        className="w-full h-50 mt-2.5 pl-2.5"
        style={{
          backgroundColor: "#fdfdfd",
          lineHeight: "50px",
          fontWeight: "bold",
          boxSizing: "border-box",
        }}
        onClick={() => navigate("/setting")}
      >
        设置
        <span className="absolute right-5" style={{ color: "#bfbfbf" }}>
          {">"}
        </span>
      </div>
    </div>
  );
}
