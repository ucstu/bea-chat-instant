import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCommentAlt,
  faUserCircle,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
    ? styles.navbarItem + " relative " + styles.navbarItemActive
    : styles.navbarItem + " relative";
}

export default React.memo(() => {
  return (
    <div className="fixed bottom-0 flex justify-space-around w-full h-50 bg-gray-200">
      <NavLink to="/message" className={getNavLinkClassName}>
        <NavLinkItem icon={faUserXmark} badge name="消息" />
      </NavLink>
      <NavLink to="/contact" className={getNavLinkClassName}>
        <NavLinkItem icon={faUserCircle} name="联系人" />
      </NavLink>
      <NavLink to="/mine" className={getNavLinkClassName}>
        <NavLinkItem icon={faCommentAlt} name="我的" />
      </NavLink>
    </div>
  );
});

type NavLinkItemProp = {
  icon?: IconProp;
  name: string | JSX.Element;
} & (
  | {
      badge?: true;
      count?: number;
    }
  | { badge: false }
);
const NavLinkItem = React.memo((props: NavLinkItemProp) => {
  const { icon, badge, name } = props;
  return (
    <>
      <div className="text-center text-gray-500">
        {icon && <FontAwesomeIcon icon={icon} />}
        {badge && (
          <div className="w-13 h-13 bg-red-900 absolute top-0 right-d9 rounded-7 text-12 leading-13">
            {props.count || ""}
          </div>
        )}
      </div>
      {name}
    </>
  );
});
