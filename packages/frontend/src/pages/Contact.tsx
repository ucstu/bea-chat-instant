import { setContacts } from "@/stores/main";
import { Store } from "@/stores/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { queryContacts } from "../apis/index";
import Header from "../components/Header";

export default function Contact() {
  const contacts = useSelector((store: Store) => store.main.contacts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    queryContacts({}).then((_contacts) => {
      dispatch(setContacts(_contacts));
    });
  }, []);

  return (
    <>
      <Header
        title="联系人"
        right={<FontAwesomeIcon icon={faSearch} size="xl" />}
      />
      {Object.entries(contacts).map(([userID, userInfo]) => (
        <div
          className="h-12.5 w-full flex pl-4"
          key={userID}
          onClick={() => navigate(`/chat/${userID}`)}
        >
          <img
            src={userInfo.avatar}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "5px",

              alignSelf: "center",
            }}
          />
          <div
            className="ml-4 w-full"
            style={{
              borderBottom: "1px solid #e6e3e3",
              lineHeight: "50px",
            }}
          >
            {userInfo.name}
          </div>
        </div>
      ))}
    </>
  );
}
