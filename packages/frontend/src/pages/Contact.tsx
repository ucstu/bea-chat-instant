import UserCard from "@/components/UserCard";
import { setContacts } from "@/stores/main";
import { Store } from "@/stores/types";
import { debounce } from "@/utils/debounce";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { queryContacts, UserInfo } from "../apis/index";
import Header from "../components/Header";

export default function Contact() {
  const contacts = useSelector((store: Store) => store.main.contacts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // start: 设置 popper 相关
  const [referenceElement, setReferenceElement] =
    useState<SVGSVGElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement },
      },
    ],
  });
  // end: 设置 popper 相关

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    queryContacts({}).then((_contacts) => {
      dispatch(setContacts(_contacts));
    });
  }, []);

  return (
    <>
      <Header
        title="联系人"
        right={
          <>
            <FontAwesomeIcon
              icon={faSearch}
              size="xl"
              ref={setReferenceElement}
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            />
            <div
              ref={setPopperElement}
              style={{
                ...styles.popper,
                visibility: showSearch ? "inherit" : "hidden",
              }}
              className="bg-white"
              {...attributes.popper}
            >
              <UserSearch
                contacts={Object.values(contacts)}
                onClick={(userInfo) => navigate(`/chat/${userInfo.userID}`)}
              />
              <div ref={setArrowElement} style={styles.arrow} />
            </div>
          </>
        }
      />
      <div className="px-2">
        {Object.entries(contacts).map(([userID, userInfo]) => (
          <UserCard
            key={`c-${userID}`}
            userID={userID}
            userInfo={userInfo}
            onClick={(userInfo) => navigate(`/chat/${userInfo.userID}`)}
          />
        ))}
      </div>
    </>
  );
}

export interface UserSearchProps {
  contacts: Array<UserInfo>;
  onClick: (userInfo: UserInfo) => void;
}
const UserSearch = React.memo(({ contacts, onClick }: UserSearchProps) => {
  const [username, setUsername] = useState("");
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const computeNewItems = useCallback(
    debounce((username) => {
      setCards(
        contacts
          .filter((contact) => contact.name.includes(username))
          .map((contact) => (
            <UserCard
              key={`cs-${contact.userID}`}
              userID={contact.userID}
              userInfo={contact}
              onClick={onClick}
            />
          ))
      );
    }, 500),
    [contacts]
  );

  return (
    <div className="border-2 border-blue-300 rounded-md">
      <input
        value={username}
        className="border-b-2 border-blue-200"
        autoFocus={true}
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
          computeNewItems(e.target.value);
        }}
      />
      {cards}
    </div>
  );
});
