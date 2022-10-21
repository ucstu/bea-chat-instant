import TabBar from "@/components/TabBar";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <div
        className="w-full overflow-hidden"
        style={{
          height: "calc(100% - 3.5rem)",
        }}
      >
        <Outlet></Outlet>
      </div>
      <TabBar></TabBar>
    </>
  );
}
