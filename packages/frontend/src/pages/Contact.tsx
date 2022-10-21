import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
];
export default function Contact() {
  return (
    <div style={{ height: "calc(100vh - 50px)", overflow: "scroll" }}>
      <Header
        title="联系人"
        right={<FontAwesomeIcon icon={faSearch} size="xl" />}
      />
      <div style={{ marginTop: "15px" }}>
        {arr.map((item, index) => {
          return (
            <div
              className="h-12.5 w-full flex pl-4 "
              key={index}
              style={{ boxSizing: "border-box" }}
            >
              <img
                src="https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
                alt="avatar"
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
      </div>
    </div>
  );
}
