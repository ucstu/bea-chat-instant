import TabBar from "@/components/TabBar";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full flex-auto">
        <Outlet></Outlet>
      </div>
      <TabBar></TabBar>
    </div>
  );
}
