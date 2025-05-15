import Button from "@/components/Button";
import MonthlyProgress from "@/components/MonthlyProgress";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleTodayDrink = () => {
    router.push("./todayDrink");
  };

  const handleMonthlyLimit = () => {
    router.push("./monthlyLimit");
  };

  return (
    <div className="mt-19 flex w-full flex-col items-center justify-center gap-8 px-9">
      <div>
        <span className="text-base font-bold">
          적당히 즐기는 음주 습관 기록장
        </span>
        <h1 className="text-[2.5rem] font-bold">한잔일지 🍷</h1>
      </div>
      <MonthlyProgress totalLimit={8} drinkCount={1} />
      <div className="flex w-full flex-col gap-4">
        <Button color="primary" onClick={handleTodayDrink}>
          오늘의 한잔 기록하기
        </Button>
        <Button color="accent" onClick={handleMonthlyLimit}>
          이달의 목표 정하기
        </Button>
      </div>
    </div>
  );
}
