import type { SVGAttributes } from "react";

export type IconName =
  | "home"
  | "calendar"
  | "food"
  | "beer"
  | "arrow"
  | "return"
  | "back";

type SVGIconProp = {
  name: IconName;
  size?: number;
} & SVGAttributes<SVGElement>;

export const SVGIcon = ({ name, size = 32, className }: SVGIconProp) => {
  return (
    <svg
      className={className}
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 30 30"
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
