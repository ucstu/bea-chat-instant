import { useNavigate } from "react-router-dom";
import {faAngleLeft,faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type propsType={
  angleLeft:boolean,
  rightSearch?:boolean,
  background?:string
  title:string
}
export default function Title(props:propsType) {
  const {angleLeft,rightSearch,background,title}=props
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-50  leading-50 bg-gray-100" style={{backgroundColor:`${background}`}}>
      {
        angleLeft===undefined | angleLeft==true ? <div className="absolute left-10 "  onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div> : ''
      }

      <div style={{ textAlign: "center" }}>{title}</div>
      {/* {右侧搜索图标显示} */}
     {
      rightSearch ?  <div  className="absolute right-30 " style={{top:0}}>
        <FontAwesomeIcon icon={faSearch} />
      </div> : ''
     }
    </div>
  );
}
