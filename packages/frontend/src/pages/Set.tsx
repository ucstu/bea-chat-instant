import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
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
  return (
    <div>
      <Title />
      <ItemCard configure={itemArr} />
      <div className="w-full text-center absolute bottom-0">
        <button
          className="w-full h-40 mt-5"
          style={{ border: 0, padding: 0, backgroundColor: "#fdfdfd" }}
        >
          切换账号
        </button>
        <div
          className="w-full h-40 mt-5 "
          style={{ backgroundColor: "#fdfdfd" }}
        >
          退出
        </div>
      </div>
    </div>
  );
}
function Title() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-50 bg-blue-400 leading-50">
      <div className="absolute left-10 " onClick={() => navigate("/mine")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>

      <div style={{ textAlign: "center" }}>设置</div>
    </div>
  );
}
