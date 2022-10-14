import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
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
        <div style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faCommentAlt} />
        </div>
        消息
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? styles.navbarItemActive : styles.navbarItem
        }
      >
        <div>
          <FontAwesomeIcon icon={faCommentAlt} />
        </div>
        联系人
      </NavLink>
      <NavLink
        to="/mine"
        className={({ isActive }) =>
          isActive ? styles.navbarItemActive : styles.navbarItem
        }
      >
        <div>
          <FontAwesomeIcon icon={faCommentAlt} />
        </div>
        我的
      </NavLink>
    </div>
  );
}
