import Button from "@/components/Button";
import MonthlyProgress from "@/components/MonthlyProgress";
import { createClient } from "@/utils/supabase/server-props";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const now = new Date();
  // 이달의 첫날
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  // 이달의 마지막날
  const lastDay = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).toISOString();

  const { data: drinkCountData, error: drinkCountError } = await supabase
    .from("dailyDrink")
    .select()
    .eq("user_id", user.id)
    .gte("created_at", firstDay)
    .lte("created_at", lastDay);

  const { data: totalLimitData, error: totalLimitError } = await supabase
    .from("MonthlyLimit")
    .select("limit")
    .eq("user_id", user.id)
    .single(); //하나만 가져오기 (1개인 경우 편하게 객체로 받아올 수 있음)

  const drinkCount = drinkCountError ? 0 : drinkCountData.length;
  const totalLimit = totalLimitError ? 0 : totalLimitData.limit;

  return {
    props: {
      drinkCount,
      totalLimit,
    },
  };
}

type HomeProp = {
  totalLimit: number;
  drinkCount: number;
};

export default function Home({ drinkCount, totalLimit }: HomeProp) {
  const router = useRouter();

  return (
    <div className="mt-19 flex w-full flex-col items-center justify-center gap-8 px-9">
      <div>
        <span className="text-base font-bold">
          적당히 즐기는 음주 습관 기록장
        </span>
        <h1 className="text-[2.5rem] font-bold">한잔일지 🍷</h1>
      </div>
      <MonthlyProgress totalLimit={totalLimit} drinkCount={drinkCount} />
      <div className="flex w-full flex-col gap-4">
        <Button color="primary" onClick={() => router.push("./todayDrink")}>
          오늘의 한잔 기록하기
        </Button>
        <Button color="accent" onClick={() => router.push("./monthlyLimit")}>
          이달의 목표 정하기
        </Button>
      </div>
    </div>
  );
}
