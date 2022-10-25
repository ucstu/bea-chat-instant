import { Store } from "@/stores/types";
import { EitherOr } from "@/types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCommentAlt,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./styles/TabBar.module.scss";

type GetNLCNameParm = {
  isActive: boolean;
  isPending: boolean;
};

/**
 * 它接受一个具有名为 isActive 的属性的对象，并返回一个字符串，该字符串要么是 styles.navbarItem 属性的值，要么是 styles.navbarItem 属性的值加上
 * styles.navbarItemActive 属性的值
 * @param {GetNLCNameParm}  - getNavLinkClassName 函数的 Parm 类型
 * @returns 一个字符串
 */
function getNavLinkClassName({ isActive }: GetNLCNameParm): string | undefined {
  return isActive
    ? `${styles.navbarItem} ${styles.navbarItemActive}`
    : styles.navbarItem;
}

export default React.memo(() => {
  const messages = useSelector((state: Store) => state.message);
  return (
    <div className="w-full h-14 sticky bottom-0 flex-shrink-0 flex justify-around bg-gray-50">
      <NavLink to="/message" className={getNavLinkClassName}>
        <NavLinkItem
          icon={faCommentAlt}
          count={
            Object.values(messages)
              .flat()
              .filter((message) => !message.readied).length
          }
          name="消息"
        />
      </NavLink>
      <NavLink to="/contact" className={getNavLinkClassName}>
        <NavLinkItem icon={faUserFriends} name="联系人" />
      </NavLink>
      <NavLink to="/mine" className={getNavLinkClassName}>
        <NavLinkItem icon={faUser} name="我的" />
      </NavLink>
    </div>
  );
});

type NavLinkItemProp = {
  icon?: IconProp;
  name: string | JSX.Element;
} & EitherOr<
  {
    badge?: boolean;
    count?: number;
  },
  "badge",
  "count"
>;
const NavLinkItem = React.memo(
  ({ icon, badge, count, name }: NavLinkItemProp) => {
    return (
      <div className="relative">
        <div className="text-center text-gray-500">
          {icon && <FontAwesomeIcon icon={icon} />}
          {badge || count ? (
            <div className="w-3 h-3 absolute top-0 right-0 rounded-full bg-red-600 text-xs font-medium">
              {count || ""}
            </div>
          ) : null}
        </div>
        {name}
      </div>
    );
  }
);
