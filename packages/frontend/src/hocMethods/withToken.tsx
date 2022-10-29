import { Store } from "@/stores/types";
import setApiClientToken from "@/utils/setApiClientToken";
import { proxy, unProxy } from "ajax-hook";
import { ComponentType, useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UtilContext } from "./withUtils";

export default (_Component: ComponentType) => {
  return (props: ComponentType["propTypes"]) => {
    const component = useMemo(() => <_Component {...props} />, [props]);
    const token = useSelector((state: Store) => state.main.token);
    const utils = useContext(UtilContext);
    const navigate = useNavigate();

    useEffect(() => {
      setApiClientToken(token);
      proxy({
        onResponse: (response, handler) => {
          if (response.status >= 400 && response.status <= 499) {
            utils.showToast(response.response.msg);
            navigate("/login");
          }
          if (response.status >= 500 && response.status <= 599) {
            utils.showToast(response.response.msg);
          }
          handler.next(response);
        },
      });
      return () => unProxy();
    }, [token]);

    return component;
  };
};
