import { ReactNode } from "react";

type ButtonProp = {
  size?: "s" | "m" | "l";
  color?: "primary" | "accent";
  children: ReactNode;
  onClick: () => void;
};

export default function Button({
  size = "l",
  color = "primary",
  children,
  onClick,
}: ButtonProp) {
  const BtnSize =
    size === "l"
      ? "h-18 w-full text-[1.375rem]"
      : size === "m"
        ? "h-15 w-54 text-xl"
        : "h-15 w-43 text-xl";

  const BtnColor =
    color === "primary"
      ? "bg-primary text-white cursor-pointer"
      : "bg-yellow-50 text-text cursor-pointer";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BtnSize} ${BtnColor} rounded-2xl font-bold`}
    >
      {children}
    </button>
  );
}
