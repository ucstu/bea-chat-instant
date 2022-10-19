import {
  faCommentAlt,
  faUserCircle,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styles from "./styles/TabBar.module.scss";

export default function TabBar() {
  return (
    <div className={styles.navbar}>
      <NavLink
        to="/message"
        className={({ isActive }) =>
          isActive ? styles.navbarItemActive : styles.navbarItem
        }
      >
        <div className="text-center text-gray-500 relative">
          <FontAwesomeIcon icon={faUserXmark} />
          <Title />
        </div>
        消息
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? styles.navbarItemActive : styles.navbarItem
        }
      >
        <div className="text-center text-gray-500">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        联系人
      </NavLink>
      <NavLink
        to="/mine"
        className={({ isActive }) =>
          isActive ? styles.navbarItemActive : styles.navbarItem
        }
      >
        <div className="text-center text-gray-500">
          <FontAwesomeIcon icon={faCommentAlt} />
        </div>
        我的
      </NavLink>
    </div>
  );
}
function Title() {
  return (
    <div className="w-13 h-13 bg-red-900 absolute top-1 left-14 rounded-7 text-12 leading-13">
      <span>1</span>
    </div>
  );
}
