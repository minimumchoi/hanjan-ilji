type InputType = "email" | "password" | "passwordCheck" | "nickName";

type InputProp = {
  type: InputType;
  showValidation: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelId: string;
};

export default function Input({
  type,
  showValidation,
  value,
  onChange,
  labelId,
}: InputProp) {
  const config = {
    email: {
      placeholder: "email@example.com",
      validMsg: "올바른 이메일 형식이 아닙니다.",
    },
    password: {
      placeholder: "비밀번호를 입력해주세요",
      validMsg:
        "영문 대소문자, 숫자, 특수문자를 포함해 10자 이상 입력해주세요.",
    },
    passwordCheck: {
      placeholder: "비밀번호를 입력해주세요",
      validMsg: "비밀번호가 일치하지 않습니다.",
    },
    nickName: {
      placeholder: "닉네임을 입력해주세요",
      validMsg: "닉네임은 10자 이내로 입력해주세요.",
    },
  };
  const { placeholder, validMsg } = config[type];

  return (
    <>
      <input
        type={
          type === "email"
            ? "email"
            : type === "password" || "passwordCheck"
              ? "password"
              : "text"
        }
        className="focus:border-primary h-12 w-full border-b-3 border-gray-300 p-1.5 text-lg outline-none placeholder:text-base placeholder:text-gray-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={labelId}
      />
      {showValidation ? (
        <span className="mt-1 min-h-6 p-1.5 text-sm text-red-500">
          {validMsg}
        </span>
      ) : (
        <span className="mt-1 min-h-6 p-1.5 text-sm"></span>
      )}
    </>
  );
}
