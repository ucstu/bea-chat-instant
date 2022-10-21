import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getContacts } from "../apis/index";
import Header from "../components/Header";

export default function Contact() {
  const [userInfo, setUserInfo] = useState<object[]>([]);
  useEffect(() => {
    getContacts({}).then((value) => {
      setUserInfo(value);
    });
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 50px)",
        overflow: "scroll",
      }}
    >
      <Header
        title="联系人"
        right={<FontAwesomeIcon icon={faSearch} size="xl" />}
      />
      <div style={{ marginTop: "15px" }}>
        {userInfo.map((obj, index) => {
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
                {obj.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
