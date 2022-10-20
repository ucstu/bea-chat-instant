import { Store } from "@/stores/types";
import Main from "@/views/Main";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styles from "./index.module.scss";

const animationPaths: Array<string> = ["/chat"];

export default function WQRoute() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState(styles.pageEnter);

  useEffect(() => {
    if (location === displayLocation) return;
    if (animationPaths.find((path) => location.pathname.startsWith(path))) {
      setTransitionStage(styles.pageExit);
      return;
    }
    setDisplayLocation(location);
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage} w-full h-full flex-col`}
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
            element={<LazyLoad componentName="Message" />}
          />
          <Route
            path="contact"
            element={<LazyLoad componentName="Contact" />}
          />
          <Route path="mine" element={<LazyLoad componentName="Mine" />} />
        </Route>
        <Route path="/login" element={<LazyLoad componentName="Login" />} />
        <Route
          path="/register"
          element={<LazyLoad componentName="Register" />}
        />
        <Route
          path="/chat/:userId"
          element={<LazyLoad componentName="Chat" />}
        />
        <Route path="/chat/set" element={<LazyLoad componentName="Set" />} />
      </Routes>
    </div>
  );
}

interface AuthOrNotProps {
  component: ReactElement;
}
const AuthOrNot = React.memo(({ component }: AuthOrNotProps) => {
  const token = useSelector((state: Store) => state.main.token);
  return token ? component : <Navigate to="/login" />;
});

const LazyLoad = React.memo(({ componentName }: { componentName: string }) => {
  const Component = React.lazy(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => import(/* @vite-ignore */ "../pages/" + componentName)
  );
  return (
    <Suspense
      fallback={
        <div className="flex w-full h-full justify-center items-center">
          <div className={styles.ldsBea}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
});
