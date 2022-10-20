import TabBar from "@/components/TabBar";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <div className="flex-auto">
        <Outlet></Outlet>
      </div>
      <TabBar></TabBar>
    </>
  );
}
