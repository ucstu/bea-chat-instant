
import { EitherOr } from "@/types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderProps = {
  right?: JSX.Element;
} & EitherOr<{
  middle: JSX.Element;
  title: string;
}, "middle", "title"> & EitherOr<{
  left?: JSX.Element;
  leftIcon?: IconProp;
}, "left", "leftIcon">

export default function Header({ left, leftIcon, middle, title = "微Q", right }: HeaderProps) {
  return (
    <div className="bg-gray-300 h-50 flex justify-around bg-red-600">
      <div>{left || (leftIcon && <FontAwesomeIcon icon={leftIcon} />)}</div>
      <div>{middle || title}</div>
      <div>{right}</div>
    </div>
  )
}
