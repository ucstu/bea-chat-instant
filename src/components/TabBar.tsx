import { NavLink } from "react-router-dom";

export default function TabBar() {
  return (
    <div>
      <NavLink to="/message">消息</NavLink>
      <NavLink to="/contact">联系人</NavLink>
      <NavLink to="/mine">我的</NavLink>
    </div>
  );
}
