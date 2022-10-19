type PropsType = {
  configure: Array<{
    category?: string;
    options: { name: string; img?: string; angleLeft?: boolean };
  }>;
};
export default function ItemCar(props: PropsType) {
  return (
    <>
      <div
        className="pl-10 mt-10"
        style={{ fontWeight: "bold", backgroundColor: "#fdfdfd" }}
      >
        {itemArr.map((item, index) => (
          <div
            key={index}
            className="w-full h-50 relative"
            style={{
              borderBottom: "1px solid #f7f7f7",
              lineHeight: "50px",
              boxSizing: "border-box",
            }}
          >
            {item}
            <span className="absolute right-20" style={{ color: "#bfbfbf" }}>
              {">"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
