import { ReactNode } from "react";

type ButtonProp = {
  size?: "s" | "m" | "l";
  color?: "primary" | "accent";
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  size = "l",
  color = "primary",
  children,
  onClick,
  disabled = false,
}: ButtonProp) {
  const BtnSize =
    size === "l"
      ? "h-20 w-full text-2xl"
      : size === "m"
        ? "h-15 w-54 text-xl"
        : "h-15 w-43 text-xl";

  const BtnColor = (() => {
    if (disabled) {
      return color === "primary"
        ? "bg-primary/40 text-white/70 cursor-not-allowed"
        : "bg-accent/50 text-text/60 cursor-not-allowed";
    }

    return color === "primary"
      ? "bg-primary text-white cursor-pointer"
      : "bg-accent text-text cursor-pointer";
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BtnSize} ${BtnColor} rounded-2xl font-bold`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
