import Button from "@/components/Button";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between px-9 py-[8vh]">
      <div className="mt-[24vh]">
        <span className="h-5 text-base font-bold">
          적당히 즐기는 음주 습관 기록장
        </span>
        <h1 className="h-14 text-[2.5rem] font-bold">한잔일지 🍷</h1>
      </div>
      <div className="flex w-full flex-col gap-3.5">
        <Button color="primary" onClick={handleLoginClick}>
          로그인
        </Button>
        <Button color="accent" onClick={handleRegisterClick}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
