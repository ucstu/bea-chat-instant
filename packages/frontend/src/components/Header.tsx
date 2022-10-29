import { EitherOr } from "@/types";
import React from "react";

type HeaderProps = {
  /* 左侧内容 */
  left?: JSX.Element;
  /* 右侧内容 */
  right?: JSX.Element;
} & EitherOr<
  {
    /*中间内容 */
    middle?: JSX.Element;
    /* 中间标题 */
    title?: string;
  },
  "middle",
  "title"
>;

export default React.memo(({ left, middle, title, right }: HeaderProps) => {
  return (
    <div className="w-full h-12 sticky top-0 flex-shrink-0 flex justify-between items-center bg-gray-50">
      <div className="ml-5">{left}</div>
      <div className="w-full absolute flex pointer-events-none justify-center items-center v">
        <div className="pointer-events-auto">{middle || title}</div>
      </div>
      <div className="mr-5">{right}</div>
    </div>
  );
});
