import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  return (
    <div style={{ backgroundColor: "#f9f9f9", height: "calc(100vh - 50px)" }}>
      {/* {个人信息头部} */}
      <div
        className=" flex  w-full  pl-10 pr-10 mb-10"
        style={{
          boxSizing: "border-box",
          height: "150px",
          backgroundColor: "#fdfdfd  ",
        }}
      >
        <div className=" items-center flex ">
          <img
            className="h-60 w-60 rounded-5 ml-10"
            src="https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
            alt="avatar"
          />
        </div>
        <div className="ml-10 mt-45 leading-30">
          <div style={{ fontSize: "19px", fontWeight: "bolder" }}>Plute</div>
          <div
            style={{ fontWeight: "bolder", color: "#707070", fontSize: "14px" }}
          >
            微信号：Zz_sd
          </div>
        </div>
        <div
          className="flex h-18 items-center"
          style={{ marginLeft: "120px", marginTop: "80px", color: "#bfbfbf" }}
        >
          <FontAwesomeIcon icon={faQrcode} className="w-14 h-14" />
          <div className="ml-20 leading-18">{">"}</div>
        </div>
      </div>
      {/* {卡片item} */}
      <ItemCard configure={itemArr} />
      <div
        className="w-full h-50 mt-10 pl-10"
        style={{
          backgroundColor: "#fdfdfd",
          lineHeight: "50px",
          fontWeight: "bold",
          boxSizing:'border-box'
        }}
        onClick={() => navigate("/chat/set")}

      >
        设置
        <span className="absolute right-20" style={{ color: "#bfbfbf" }}>
          {">"}
        </span>
      </div>
    </div>
  );
}
