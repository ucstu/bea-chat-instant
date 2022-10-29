import { UserInfo } from "@/stores/types/main";
import React from "react";

export interface UserCardProps {
  userID: string;
  userInfo: UserInfo;
  onClick: (userInfo: UserInfo) => void;
}
export default React.memo(({ userID, userInfo, onClick }: UserCardProps) => {
  return (
    <div className="h-12.5 flex" key={userID} onClick={() => onClick(userInfo)}>
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
  );
});
