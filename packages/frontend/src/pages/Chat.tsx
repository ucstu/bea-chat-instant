import { useLocation } from "react-router-dom";
import Header from '../components/Header'
export default function Chart() {
  const location=useLocation()


  return (
    <div className="overflow-hidden w-full h-full bg-gray-200">
      <div className="h-300 w-full ">
        <div className="text-center w-full  h-50 leading-50 text-15 font-semibold bg-gray-100">
          <Header title={location.search.split('?')[1]} />
        </div>
        <div
          style={{ height: "calc(100vh - 50px)", backgroundColor: "red" }}
        ></div>
      </div>
    </div>
  );
}
