import { setToken } from "@/stores/main";
import type { MainState } from "@/stores/types/main";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const token = useSelector((state: MainState) => state.token);
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() =>
          dispatch(
            setToken(
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            )
          )
        }
      >
        Login
      </div>
      <h2>{token}</h2>
    </>
  );
}
