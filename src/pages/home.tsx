import Button from "@/components/Button";
import MonthlyProgress from "@/components/MonthlyProgress";

import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();
  const [drinkCount, setDrinkCount] = useState(0);

  const getCountData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const now = new Date();
    const firstDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ).toISOString();
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    ).toISOString();

    const { data, error } = await supabase
      .from("dailyDrink")
      .select()
      .eq("user_id", user?.id)
      .gte("created_at", firstDay)
      .lte("created_at", lastDay);

    if (error) {
      console.log("에러");
      return;
    }
    return data.length;
  };

  // 나중에 제거
  const handleOnclick = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }
  };

  const handleTodayDrink = () => {
    router.push("./todayDrink");
  };

  const handleMonthlyLimit = () => {
    router.push("./monthlyLimit");
  };

  useEffect(() => {
    const fetchDrinkCount = async () => {
      const count = await getCountData();
      setDrinkCount(count);
    };

    fetchDrinkCount();
  });

  return (
    <div className="mt-19 flex w-full flex-col items-center justify-center gap-8 px-9">
      <div>
        <span className="text-base font-bold">
          적당히 즐기는 음주 습관 기록장
        </span>
        <h1 className="text-[2.5rem] font-bold">한잔일지 🍷</h1>
      </div>
      <MonthlyProgress totalLimit={8} drinkCount={drinkCount} />
      <div className="flex w-full flex-col gap-4">
        <Button color="primary" onClick={handleTodayDrink}>
          오늘의 한잔 기록하기
        </Button>
        <Button color="accent" onClick={handleMonthlyLimit}>
          이달의 목표 정하기
        </Button>
        <Button onClick={handleOnclick}>로그아웃</Button>
      </div>
    </div>
  );
}
