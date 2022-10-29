import { memo } from "react";
type PropsType = {
  configure: Array<{
    category?: string;
    options: Array<{ name: string; img?: string; angleLeft?: boolean }>;
  }>;
};
function ItemCar(props: PropsType) {
  return (
    <>
      <div>
        {props.configure.map((item, index) => (
          <div key={index}>
            {item.category ? (
              <div
                className="leading-3 font-bold mt-5 pl-2.5 mb-1"
                style={{
                  color: "#949494",
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
                className="w-full h-50 relative box-border pl-2.5 font-bold "
                style={{
                  borderBottom: "1px solid #f7f7f7",
                  lineHeight: "50px",
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
export default memo(ItemCar);
