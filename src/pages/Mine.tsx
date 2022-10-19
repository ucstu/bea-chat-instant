export default function Mine() {
  return (
    <div>
      <div
        className="header flex h-100 w-full bg-gray-900  pl-10 pr-10"
        style={{ boxSizing: "border-box" }}
      >
        <div className="userImg items-center flex">
          <img
            className="h-50 w-50 rounded-5"
            src="https://ts1.cn.mm.bing.net/th?id=OIP-C.B6pZ8N_dG3MNAYppM-zX0AHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
            alt="avatar"
          />
        </div>
        <div className="ml-10 mt-25 leading-25">
          <div className="name">呢称</div>
          <div className="userId">账号：2334348</div>
        </div>
      </div>
      <div className="item"></div>
    </div>
  );
}
