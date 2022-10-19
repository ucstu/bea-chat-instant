import Chart from "@/pages/Chart";
import type { Store } from "@/types";
import Main from "@/views/Main";
import { lazy, ReactElement, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./index.scss";

const blacklist: Array<string> = ["/chart"];

export default function WQRoute() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("page-enter");
  useEffect(() => {
    if (location === displayLocation) return;
    if (blacklist.find((path) => location.pathname.startsWith(path))) {
      setTransitionStage("page-exit");
      return;
    }
    setDisplayLocation(location);
  }, [location, displayLocation]);

  interface AuthOrNotProps {
    Component: ReactElement;
  }

  function AuthOrNot({ Component }: AuthOrNotProps) {
    const token = useSelector((state: Store) => state.main.token);
    return token ? Component : <Navigate to="/login" />;
  }

  return (
    <div
      className={transitionStage}
      style={{
        width: "100vw",
        height: "100vh",
      }}
      onAnimationEnd={() => {
        if (transitionStage === "page-exit") {
          setTransitionStage("page-enter");
          setDisplayLocation(location);
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<AuthOrNot Component={<Main />} />}>
          <Route index element={<Navigate to="/message" />} />
          <Route path="message" element={LazyLoad("../pages/Message")} />
          <Route path="contact" element={LazyLoad("../pages/Contact")} />
          <Route path="mine" element={LazyLoad("../pages/Mine")} />
        </Route>
        <Route path="/login" element={LazyLoad("../pages/Login")} />
        <Route path="/register" element={LazyLoad("../pages/Register")} />
        <Route path="/chart/:userId" element={<Chart />} />
        <Route path="/chart/set" element={LazyLoad("../pages/Set")} />
      </Routes>
    </div>
  );
}

function LazyLoad(path: string) {
  const Component = lazy(() => import(/* @vite-ignore */ path));
  return (
    <Suspense fallback={<>loading</>}>
      <Component />
    </Suspense>
  );
}
