type InputType = "email" | "password" | "passwordCheck" | "nickName";

type InputProp = {
  type: InputType;
  showValidation: boolean;
  value: string;
  onChange: () => void;
};

export default function Input({
  type,
  showValidation,
  value,
  onChange,
}: InputProp) {
  const config = {
    email: {
      placeholder: "email@example.com",
      validMsg: "이메일을 입력해주세요",
    },
    password: {
      placeholder: "비밀번호를 입력해주세요",
      validMsg: "비밀번호를 확인해주세요",
    },
    passwordCheck: {
      placeholder: "비밀번호를 입력해주세요",
      validMsg: "비밀번호를 확인해주세요",
    },
    nickName: {
      placeholder: "닉네임을 입력해주세요",
      validMsg: "닉네임을 확인해주세요",
    },
  };
  const { placeholder, validMsg } = config[type];

  return (
    <>
      <input
        type={type === "email" ? "email" : "text"}
        {...(type === "email"
          ? { pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }
          : {})}
        className="focus:border-primary h-12 w-78 border-b-3 border-gray-300 p-1.5 text-lg outline-none placeholder:text-base placeholder:text-gray-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {showValidation && (
        <span className="mt-1 px-1.5 text-base text-red-500">{validMsg}</span>
      )}
    </>
  );
}
