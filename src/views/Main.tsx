import TabBar from "@/components/TabBar";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <Outlet></Outlet>
      <TabBar></TabBar>
    </>
  );
}
