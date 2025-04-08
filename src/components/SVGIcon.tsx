import type { SVGAttributes } from "react";

export type IconName = "home" | "calender" | "food" | "beer";

type SVGIconProp = {
  name: IconName;
  size?: number;
} & SVGAttributes<SVGElement>;

export const SVGIcon = ({ name, size = 32, className }: SVGIconProp) => {
  return (
    <svg className={className} fill="none" width={size} height={size}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
