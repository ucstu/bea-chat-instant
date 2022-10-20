import TabBar from "@/components/TabBar";
import { Outlet } from "react-router-dom";

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
      <TabBar></TabBar>
    </>
  );
}
