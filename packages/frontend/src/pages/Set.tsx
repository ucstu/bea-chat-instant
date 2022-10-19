import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
const itemArr = ["账号与安全", "青少年模式", "关怀模式"];
const itemArr2 = ["个人信息与权限", "个人信息收集清单", "第三方信息共享清单"];
const arr = [
  {
    category: "隐私",
    options: {
      name: "书店你",
    },
  },
  {
    options: {
      name: "大苏打",
      angleLeft: false,
    },
  },
];
export default function set() {
  return (
    <div>
      <Title />
      <ItemCard configure={arr} />
      <div>
        {itemArr.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
      <div>
        {itemArr2.map((item, index) => (
          <div>{item}</div>
        ))}
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
