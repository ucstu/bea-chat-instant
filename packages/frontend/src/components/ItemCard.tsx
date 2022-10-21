type PropsType = {
  configure: Array<{
    category?: string;
    options: Array<{ name: string; img?: string; angleLeft?: boolean }>;
  }>;
};
export default function ItemCar(props: PropsType) {
  return (
    <>
      <div>
        {props.configure.map((item, index) => (
          <div key={index}>
            {item.category ? (
              <div
                style={{
                  color: "#949494",
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginBottom: "5px",
                  paddingLeft: "10px",
                }}
              >
                {item.category}
              </div>
            ) : (
              ""
            )}
            {item.options.map((item2, index2) => (
              <div
                key={index2}
                className="w-full h-50 relative"
                style={{
                  borderBottom: "1px solid #f7f7f7",
                  lineHeight: "50px",
                  boxSizing: "border-box",
                  paddingLeft: "10px",
                  fontWeight: "bold",
                  backgroundColor: "#fdfdfd",
                }}
              >
                {item2.name}
                {item2.angleLeft === undefined || item2.angleLeft ? (
                  <span
                    className="absolute right-5"
                    style={{ color: "#bfbfbf" }}
                  >
                    {">"}
                  </span>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
