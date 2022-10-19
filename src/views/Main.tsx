import TabBar from "@/components/TabBar";
import React from "react";
import { Outlet } from "react-router-dom";

const MemoTabBar = React.memo(TabBar);

export default function Main() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 50px)",
          overflow: "scroll",
        }}
      >
        <Outlet></Outlet>
      </div>
      <MemoTabBar></MemoTabBar>
    </>
  );
}
