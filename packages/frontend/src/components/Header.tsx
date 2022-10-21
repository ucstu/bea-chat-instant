import { EitherOr } from "@/types";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type HeaderProps = {
  right?: JSX.Element;
} & EitherOr<
  {
    middle?: JSX.Element;
    title?: string;
  },
  "middle",
  "title"
> &
  EitherOr<
    {
      left?: JSX.Element;
      leftIcon?: IconProp;
    },
    "left",
    "leftIcon"
  >;

export default React.memo(
  ({ left, leftIcon, middle, title, right }: HeaderProps) => {
    return (
      <>
        <div className="w-full h-12 fixed flex justify-between items-center bg-gray-50">
          <div className="ml-5">
            {left || (leftIcon && <FontAwesomeIcon icon={leftIcon} />)}
          </div>
          <div className="w-full absolute flex pointer-events-none justify-center items-center v">
            <div className="pointer-events-auto">{middle || title}</div>
          </div>
          <div className="mr-5">{right}</div>
        </div>
        <div className="w-full h-12"></div>
      </>
    );
  }
);
