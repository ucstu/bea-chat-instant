import { userLogin } from "@/apis";
import useUtils from "@/hooks/useUtils";
import { setToken, setUserInfo } from "@/stores/main";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { InputHTMLAttributes } from "react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles/Login.module.scss";

export default function Login() {
  const utils = useUtils();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="h-1/2">
        <div
          className="h-full -translate-x-1/4 overflow-hidden rounded-b-full"
          style={{ width: "200vw" }}
        >
          <img
            className="w-screen h-full translate-x-1/2"
            src="https://imgb14.photophoto.cn/20200807/zhinengshoujiliaotian-38377540_3.jpg"
            alt="chat"
          />
        </div>
      </div>
      <div className="w-full" style={{ height: "calc(100vw * 1/6)" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBGTN1ddTe_0io5vluD6q-DAqWGSfIBRYOw&usqp=CAU"
          alt="person"
          className="w-32 m-auto -translate-y-1/2 rounded-full border-4 border-solid border-blue-300"
        />
      </div>
      <div className="w-3/4 mx-auto mt-5">
        <Input
          value={username}
          onChange={(e) =>
            setUsername((e as React.ChangeEvent<HTMLInputElement>).target.value)
          }
          icon={faUser}
          type="text"
          placeholder="用户名"
        />
        <Input
          value={password}
          onChange={(e) =>
            setPassword((e as React.ChangeEvent<HTMLInputElement>).target.value)
          }
          icon={faLock}
          type="password"
          placeholder="密码"
        />
        <div className="flex justify-between">
          <CheckBox
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
            placeholder="我已阅读并同意 用户协议"
          />
          <NavLink to="/register">注册</NavLink>
        </div>
        <button
          className="w-full h-10 flex justify-center items-center rounded-full bg-blue-300"
          onClick={() => {
            if (username.trim() === "") {
              utils.showToast("用户名不能为空", false, 1000);
            } else if (password.trim() === "") {
              utils.showToast("密码不能为空", false, 1000);
            } else if (!confirm) {
              utils.showToast("请阅读并同意用户协议", false, 1000);
            } else {
              utils.showLoading(true);
              userLogin({ requestBody: { username, password } })
                .then((res) => {
                  const { token, userInfo } = res;
                  dispatch(setToken(token));
                  dispatch(setUserInfo(userInfo));
                  navigate("/");
                })
                .catch((reason) => utils.showToast(reason.body.msg))
                .finally(utils.hiddenLoading);
            }
          }}
        >
          登录
        </button>
      </div>
    </div>
  );
}

const CheckBox = React.memo((props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className="mb-4 flex items-center">
      <input {...props} type="checkbox" className={styles.checkbox} />
      <span></span>
      {props.placeholder}
    </label>
  );
});

const Input = React.memo(
  (props: FontAwesomeIconProps & InputHTMLAttributes<HTMLInputElement>) => {
    return (
      <label className="p-1 mb-4 block relative border-b-2 border-b-gray-300">
        {props.icon && (
          <FontAwesomeIcon
            color="rgb(147 197 253)"
            size="lg"
            {...props}
            className="absolute"
          />
        )}
        <div className="flex justify-center">
          <input
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            className="text-center w-4/5 outline-none"
          />
        </div>
      </label>
    );
  }
);
