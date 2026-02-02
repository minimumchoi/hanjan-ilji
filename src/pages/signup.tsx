import Button from "@/components/Button";
import Input from "@/components/Input";
import { SVGIcon } from "@/components/SVGIcon";
import { createClient } from "@/utils/supabase/component";
import {
  isPasswordMatch,
  isValidEmail,
  isValidNickName,
  isValidPassword,
} from "@/utils/validation";
import { useRouter } from "next/router";
import { useState } from "react";

const inputTypeArr = [
  { type: "email", name: "이메일" },
  { type: "password", name: "비밀번호" },
  { type: "passwordCheck", name: "비밀번호 확인" },
  { type: "nickName", name: "닉네임" },
] as const;

export default function Signup() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickName: "",
  });
  const [validationStates, setValidationStates] = useState({
    email: true,
    password: true,
    passwordCheck: true,
    nickName: true,
  });
  const [ErrorMessage, setErrorMessage] = useState("");

  const handleFocus = (
    type: "email" | "password" | "passwordCheck" | "nickName",
  ) => {
    setValidationStates((prev) => ({ ...prev, [type]: false }));
  };

  const handleBackClick = () => {
    router.push("/");
  };

  // 회원가입 버튼 클릭시 유효성 검사 및 회원가입 처리
  const handleSignUpClick = async () => {
    setErrorMessage("");

    const emailValid = isValidEmail(formData.email);
    const passwordValid = isValidPassword(formData.password);
    const passwordCheckValid = isPasswordMatch(
      formData.passwordCheck,
      formData.password,
    );
    const nickNameValid = isValidNickName(formData.nickName);

    setValidationStates({
      email: !emailValid,
      password: !passwordValid,
      passwordCheck: !passwordCheckValid,
      nickName: !nickNameValid,
    });

    if (
      !emailValid ||
      !passwordValid ||
      !passwordCheckValid ||
      !nickNameValid
    ) {
      return;
    }

    // 회원가입처리
    const { email, password, nickName } = formData;
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: nickName,
        },
      },
    });
    console.log(data);
    if (error) {
      if (error.message === "User already registered") {
        setErrorMessage("이미 가입된 이메일입니다.");
      } else {
        setErrorMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
      console.log(error);
    } else router.push("/login");
  };

  return (
    <div className="h-screen px-9 py-[8vh]">
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleBackClick}
      >
        <SVGIcon name="back" size={25}></SVGIcon>
      </button>
      <h1 className="text-text mt-9 mb-4 text-2xl font-bold">회원가입</h1>
      {ErrorMessage && (
        <div className="rounded-sm bg-[#FFD0D0] p-4.5 text-base font-medium text-red-500">
          {ErrorMessage}
        </div>
      )}
      <form noValidate className="mb-12 flex flex-col items-center gap-5 pt-5">
        {inputTypeArr.map((d) => (
          <div key={d.type} className="flex w-full flex-col">
            <label className="text-text text-lg font-bold" htmlFor={d.type}>
              {d.name}
            </label>
            <Input
              onFocus={() => handleFocus(d.type)}
              showValidation={validationStates[d.type]}
              labelId={d.type}
              type={d.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [d.type]: e.target.value }))
              }
              value={formData[d.type] || ""}
            ></Input>
          </div>
        ))}
      </form>
      <Button color="primary" onClick={handleSignUpClick}>
        회원가입
      </Button>
    </div>
  );
}
