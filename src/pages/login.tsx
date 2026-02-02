import Button from "@/components/Button";
import Input from "@/components/Input";
import { SVGIcon } from "@/components/SVGIcon";
import { createClient } from "@/utils/supabase/component";
import { isValidEmail, isValidPassword } from "@/utils/validation";
import { useRouter } from "next/router";
import { useState } from "react";

const inputTypeArr = [
  { type: "email", name: "이메일" },
  { type: "password", name: "비밀번호" },
] as const;

export default function Login() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationStates, setValidationStates] = useState({
    email: false,
    password: false,
  });
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleFocus = (type: "email" | "password") => {
    setValidationStates((prev) => ({ ...prev, [type]: false }));
  };

  const handleBackClick = () => {
    router.push("/");
  };

  const handleLoginClick = async () => {
    const emailValid = isValidEmail(formData.email);
    const passwordValid = isValidPassword(formData.password);

    setValidationStates({
      email: !emailValid,
      password: !passwordValid,
    });

    if (!emailValid || !passwordValid) {
      return;
    }
    const { email, password } = formData;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoginFailed(true);
      console.error(error);
      return;
    }

    router.push("/home");
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
      <h1 className="text-text mt-9 mb-7 text-2xl font-bold">로그인</h1>
      {isLoginFailed && (
        <div className="rounded-sm bg-[#FFD0D0] p-4.5 text-base font-medium text-red-500">
          아이디 또는 비밀번호가 일치하지 않습니다. <br />
          다시 한번 확인해 주세요.
        </div>
      )}
      <form
        noValidate
        className="mb-[30vh] flex flex-col items-center gap-5 pt-7"
      >
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
      <Button color="primary" onClick={handleLoginClick}>
        로그인
      </Button>
    </div>
  );
}
