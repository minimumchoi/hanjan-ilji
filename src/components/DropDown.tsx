import { memo, useEffect, useState } from "react";
import { SVGIcon } from "./SVGIcon";
import DropDownList from "./DropDownList";

type DropBoxProp = {
  width: "sm" | "lg";
  listArr: string[];
  onSelect: (value: string) => void;
  value: string;
};

function DropDown({ width, listArr, onSelect, value }: DropBoxProp) {
  const [isOpened, setIsOpened] = useState(false);
  const [name, setName] = useState(value || "선택해주세요");

  useEffect(() => {
    setName(value || "선택해주세요");
  }, [value]);

  const widthSize = {
    lg: "w-54",
    sm: "w-23",
  }[width];

  const textColor = name === "선택해주세요" ? "text-gray-300" : "text-black";

  const onClick = (value: string) => {
    setName(value);
    setIsOpened(false);
    onSelect?.(value);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpened}
        className={`${widthSize} flex h-12 cursor-pointer flex-row items-center rounded-xl border-3 ${isOpened ? "border-primary" : "border-gray-300"} px-2 py-1.5`}
        onClick={() => setIsOpened(!isOpened)}
      >
        <span className={`${textColor} flex-1 text-base font-bold`}>
          {name}
        </span>

        <SVGIcon
          name="arrow"
          size={23}
          className={`text-black transition-transform duration-300 ease-in-out ${
            isOpened ? "text-primary rotate-180" : ""
          }`}
        />
      </button>
      {isOpened && (
        <DropDownList
          selected={name}
          listArr={listArr}
          width={widthSize}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default memo(DropDown);
