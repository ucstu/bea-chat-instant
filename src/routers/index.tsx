import type { Store } from "@/types";
import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

export default function WQRoute() {
  interface AuthOrNotProps {
    Component: ReactElement;
  }

  function AuthOrNot({ Component }: AuthOrNotProps) {
    const token = useSelector((state: Store) => state.main.token);
    return token ? Component : <Navigate to="/login" />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthOrNot Component={LazyLoad("../views/Main")} />}
        >
          <Route path="message" element={LazyLoad("../pages/Chart")} />
          <Route path="contact" element={LazyLoad("../pages/List")} />
          <Route path="mine" element={LazyLoad("../pages/Mine")} />
        </Route>
        <Route path="/login" element={LazyLoad("../pages/Login")} />
        <Route path="/register" element={LazyLoad("../pages/Register")} />
        <Route path="/chart" element={LazyLoad("../pages/Chart")} />
      </Routes>
    </HashRouter>
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
