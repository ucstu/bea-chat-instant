import Header from "@/components/Header";
import { UtilContext } from "@/hocs/withUtils";
import type { Store } from "@/stores/types";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function Chart() {
  const { userID } = useParams();
  const navigate = useNavigate();
  const utils = useContext(UtilContext);
  const contacts = useSelector((store: Store) => store.main.contacts);
  const userInfo = useMemo(
    () => (userID ? contacts[userID] : undefined),
    [userID, contacts]
  );

  useEffect(() => {
    if (!userID) {
      utils.showToast("发生了一些错误，已回退");
      navigate(-1);
    }
  }, [userID]);

  return (
    <>
      <Header
        left={
          <FontAwesomeIcon icon={faCaretLeft} onClick={() => navigate(-1)} />
        }
        title={userInfo?.name || "用户"}
      />
    </>
  );
}
