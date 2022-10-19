
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
      <div className="relative bg-gray-300 h-50 flex justify-space-between items-center">
        <div>{left || (leftIcon && <FontAwesomeIcon icon={leftIcon} />)}</div>
        <div className="absolute text-center" style={{ width: "100vw" }}>
          {middle || title}
        </div>
        <div>{right}</div>
      </div>
    );
  }
);
