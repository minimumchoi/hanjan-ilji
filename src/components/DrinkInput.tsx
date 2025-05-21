import { RefObject } from "react";

type DrinkInputProp = {
  type: "text" | "number";
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLDialogElement | null>;
};
export default function DrinkInput({
  type,
  onChange,
  value,
  ref,
}: DrinkInputProp) {
  const config = {
    text: {
      placeHolder: "입력해주세요",
      size: "w-54",
    },
    number: {
      placeHolder: "0",
      size: "w-15",
    },
  };

  const { placeHolder, size } = config[type];
  return (
    <>
      <input
        ref={ref}
        type={type}
        className={`focus:border-primary h-12 text-center ${size} border-b-3 border-gray-300 p-1.5 text-lg outline-none placeholder:text-center placeholder:text-lg placeholder:text-gray-300`}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}
