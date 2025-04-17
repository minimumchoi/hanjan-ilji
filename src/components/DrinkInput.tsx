type DrinkInputProp = {
  type: "text" | "number";
  showValidation: boolean;
};
export default function DrinkInput({
  type,
  showValidation = false,
}: DrinkInputProp) {
  const config = {
    text: {
      placeHolder: "입력해주세요",
      size: "w-54",
      validMsg: "입력해주세요",
    },
    number: {
      placeHolder: "0",
      size: "w-15",
      validMsg: "입력해주세요",
    },
  };

  const { placeHolder, size, validMsg } = config[type];
  return (
    <>
      <input
        type={type}
        className={`focus:border-primary h-12 text-center ${size} border-b-3 border-gray-300 p-1.5 text-lg outline-none placeholder:text-center placeholder:text-lg placeholder:text-gray-300`}
        placeholder={placeHolder}
      ></input>
      {showValidation && (
        <span className="mt-1 px-1.5 text-base text-red-500">{validMsg}</span>
      )}
    </>
  );
}
