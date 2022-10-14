import { setToken } from "@/stores/main";
import { MainState } from "@/types";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const token = useSelector((state: MainState) => state.token);
  const dispatch = useDispatch();

  return (
    <>
      <div onClick={() => dispatch(setToken("123"))}>Login</div>
      <h2>{token}</h2>
    </>
  );
}
