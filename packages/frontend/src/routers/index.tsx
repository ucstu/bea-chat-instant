import { Store } from "@/stores/types";
import setApiClientToken from "@/utils/setApiClientToken";
import Main from "@/views/Main";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

const animationPaths: Array<string> = ["/chat"];

export default function WQRoute() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("");

  useEffect(() => {
    if (location === displayLocation) return;
    if (animationPaths.find((path) => location.pathname.startsWith(path))) {
      setTransitionStage(styles.pageExit);
      return;
    }
    setTransitionStage("");
    setDisplayLocation(location);
  }, [location, displayLocation]);

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === styles.pageExit) {
          setTransitionStage(styles.pageEnter);
          setDisplayLocation(location);
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<AuthOrNot component={<Main />} />}>
          <Route index element={<Navigate to="/message" />} />
          <Route
            path="message"
            element={
              <AuthOrNot component={<LazyLoad componentName="Message" />} />
            }
          />
          <Route
            path="contact"
            element={
              <AuthOrNot component={<LazyLoad componentName="Contact" />} />
            }
          />
          <Route
            path="mine"
            element={
              <AuthOrNot component={<LazyLoad componentName="Mine" />} />
            }
          />
        </Route>
        <Route path="/login" element={<LazyLoad componentName="Login" />} />
        <Route
          path="/register"
          element={<LazyLoad componentName="Register" />}
        />
        <Route
          path="/chat/:userID"
          element={<AuthOrNot component={<LazyLoad componentName="Chat" />} />}
        />
        <Route
          path="/setting"
          element={
            <AuthOrNot component={<LazyLoad componentName="Setting" />} />
          }
        />
      </Routes>
    </div>
  );
}

interface AuthOrNotProps {
  component: ReactElement;
}
const AuthOrNot = React.memo(({ component }: AuthOrNotProps) => {
  const token = useSelector((state: Store) => state.main.token);
  useEffect(() => {
    setApiClientToken(token);
  }, [token]);
  return token ? component : <Navigate to="/login" />;
});

const LazyLoad = React.memo(({ componentName }: { componentName: string }) => {
  const [element, setElement] = useState(
    <div className="w-screen h-screen z-50 flex justify-center items-center">
      <div className={styles.ldsBea}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
  useEffect(() => {
    import(/* @vite-ignore */ "../pages/" + componentName).then((Component) =>
      setElement(<Component.default></Component.default>)
    );
  }, [componentName]);
  return element;
});
