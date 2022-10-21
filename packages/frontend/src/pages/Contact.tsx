import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getContacts } from "../apis/index";
import Header from "../components/Header";

const arr = [
  1,
  2,
  "联系人",
  4,
  "联系人",
  "联系人",
  7,
  "联系人",
  9,
  "联系人",
  11,
  12,
  13,
  14,
  15,
  14,
  15,
  14,
  15,
  14,
  15,
];

export default function Contact() {
  const [userInfo, setUserInfo] = useState<object[]>([]);
  useEffect(() => {
    getContacts({}).then((value) => {
      setUserInfo(value);
    });
  }, []);

  return (
    <>
      <Header
        title="联系人"
        right={<FontAwesomeIcon icon={faSearch} size="xl" />}
      />
      {arr.map((item, index) => {
        return (
          <div
            className="h-12.5 w-full flex pl-4 "
            key={index}
            style={{ boxSizing: "border-box" }}
          >
            <img
              src={obj.avatar}
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
              {item}
            </div>
          </div>
        );
      })}
    </>
  );
}
