import React, { ComponentType, useMemo, useState } from "react";
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
  let toastTimer: NodeJS.Timeout;

  return (props: ComponentType["propTypes"]) => {
    const [loadingElement, setLoadingElement] = useState<JSX.Element>();
    const [toastElement, setToastElement] = useState<JSX.Element>();
    const utils = useMemo(
      () => ({
        showLoading(mask?: boolean) {
          setLoadingElement(
            <div
              className={`w-full h-full fixed top-0 flex justify-center items-center ${
                mask ? "pointer-events-auto" : "pointer-events-none"
              }`}
              style={{ backgroundColor: "rgba(178,178,178,0.5)" }}
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
          clearTimeout(loadingTimer);
          loadingTimer = setTimeout(() => {
            setLoadingElement(undefined);
            clearTimeout(loadingTimer);
          }, 180000);
        },
        hiddenLoading() {
          setLoadingElement(undefined);
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
          toastTimer = setTimeout(() => {
            setToastElement(undefined);
            clearTimeout(toastTimer);
          }, delay || 3000);
        },
        hiddenToast() {
          setToastElement(undefined);
          clearTimeout(toastTimer);
        },
      }),
      []
    );
    const component = useMemo(() => <_Component {...props} />, [props]);

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
