import { Store } from "@/stores/types";
import setApiClientToken from "@/utils/setApiClientToken";
import { proxy, unProxy } from "ajax-hook";
import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./withUtils.module.scss";

interface UtilContextValue {
  showLoading: (mask?: boolean) => void;
  hiddenLoading: () => void;
  showToast: (
    element: string | JSX.Element,
    mask?: boolean,
    delay?: number
  ) => void;
  hiddenToast: () => void;
}

export const UtilContext = React.createContext({} as UtilContextValue);
export default (_Component: ComponentType) => {
  let loadingTimer: NodeJS.Timeout;
  let loadingDelayTimer: NodeJS.Timeout;
  let toastTimer: NodeJS.Timeout;

  return (props: ComponentType["propTypes"]) => {
    const [loadingElement, setLoadingElement] = useState<JSX.Element>();
    const [toastElement, setToastElement] = useState<JSX.Element>();
    const component = useMemo(() => <_Component {...props} />, [props]);
    const token = useSelector((state: Store) => state.main.token);
    const navigate = useNavigate();

    const utils = useMemo(
      () => ({
        showLoading(mask?: boolean) {
          loadingDelayTimer = setTimeout(() => {
            setLoadingElement(
              <div
                className={`w-full h-full fixed top-0 flex justify-center items-center ${
                  mask ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{ backgroundColor: "rgba(147 197 253 0.5)" }}
              >
                <div className="w-1/3 aspect-square rounded-2xl flex justify-center items-center bg-blue-300">
                  <div className={styles.ldsBea}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            );
          }, 300);
          clearTimeout(loadingTimer);
          loadingTimer = setTimeout(utils.hiddenLoading, 180000);
        },
        hiddenLoading() {
          setLoadingElement(undefined);
          clearTimeout(loadingDelayTimer);
          clearTimeout(loadingTimer);
        },
        showToast(
          element: string | JSX.Element,
          mask?: boolean,
          delay?: number
        ) {
          setToastElement(
            <div
              className={`w-full h-full fixed top-0 flex justify-center items-center ${
                mask ? "pointer-events-auto bg-blue-300" : "pointer-events-none"
              }`}
            >
              {typeof element === "string" ? (
                <span className="p-2 rounded-md bg-blue-300">{element}</span>
              ) : (
                element
              )}
            </div>
          );
          clearTimeout(toastTimer);
          toastTimer = setTimeout(utils.hiddenToast, delay || 3000);
        },
        hiddenToast() {
          setToastElement(undefined);
          clearTimeout(toastTimer);
        },
      }),
      []
    );

    useEffect(() => {
      setApiClientToken(token);
      proxy({
        onResponse: (response, handler) => {
          if (response.status >= 400 && response.status <= 499) {
            utils.showToast(response.response.msg);
            navigate("/login");
          }
          if (response.status >= 500 && response.status <= 599) {
            utils.showToast(response.response.msg);
          }
          handler.next(response);
        },
      });
      return () => unProxy();
    }, [token]);

    return (
      <UtilContext.Provider value={utils}>
        <>
          {component}
          {loadingElement || toastElement}
        </>
      </UtilContext.Provider>
    );
  };
};
