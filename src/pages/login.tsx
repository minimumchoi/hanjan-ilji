import Button from "@/components/Button";
import Input from "@/components/Input";
import { SVGIcon } from "@/components/SVGIcon";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const inputTypeArr = [
    { type: "email", name: "이메일" },
    { type: "password", name: "비밀번호" },
  ];

  const handleBackClick = () => {
    router.push("/");
  };
  const handleLoginClick = () => {};
  return (
    <div className="h-screen px-9 py-[8vh]">
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleBackClick}
      >
        <SVGIcon name="back" size={25}></SVGIcon>
      </button>
      <h1 className="text-text mt-9 text-2xl font-bold">로그인</h1>
      <form
        noValidate
        className="mt-14 mb-[30vh] flex flex-col items-center gap-5"
      >
        {inputTypeArr.map((d) => (
          <div key={d.type} className="flex w-full flex-col">
            <label className="text-text text-lg font-bold" htmlFor={d.type}>
              {d.name}
            </label>
            <Input labelId={d.type} type={d.type}></Input>
          </div>
        ))}
      </form>
      <Button color="primary" onClick={handleLoginClick}>
        로그인
      </Button>
    </div>
  );
}
