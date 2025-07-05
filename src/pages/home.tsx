import Button from "@/components/Button";
import MonthlyProgress from "@/components/MonthlyProgress";
import { SVGIcon } from "@/components/SVGIcon";
import { createClient } from "@/utils/supabase/server-props";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const {
    data: { user },
    // error: userFetchingError,
  } = await supabase.auth.getUser();

  // if (userFetchingError || !user) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

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
    .eq("user_id", user?.id)
    .gte("created_at", firstDay)
    .lte("created_at", lastDay);

  // 해당 월, 년도
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const { data: totalLimitData, error: totalLimitError } = await supabase
    .from("MonthlyLimit")
    .select("limit")
    .eq("user_id", user?.id)
    .eq("year", currentYear)
    .eq("month", currentMonth)
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

  const containerClass =
    totalLimit === 0
      ? "min-h-screen flex w-full flex-col items-center justify-center gap-8 px-9"
      : "mt-[12vh] flex w-full flex-col items-center justify-center gap-8 px-9";

  return (
    <div className={containerClass}>
      <div>
        <span className="text-base font-semibold">
          적당히 즐기는 음주 습관 기록장
        </span>
        <div className="flex h-12 flex-row items-center gap-0.5">
          <h1 className="h-12 text-[2.5rem] font-bold">한잔일지</h1>
          <SVGIcon name="beerCheers" size={60} />
        </div>
      </div>
      {totalLimit !== 0 && (
        <MonthlyProgress totalLimit={totalLimit} drinkCount={drinkCount} />
      )}
      {totalLimit === 0 && (
        <div className="mt-15 mb-30">
          <div className="relative inline-block">
            {/* 말풍선 본체 */}
            <div className="text-text flex h-22 w-39 items-center justify-center rounded-xl bg-purple-50 p-3 text-center text-lg font-bold">
              이달의 목표를 <br />
              정해주세요
            </div>
            {/* 꼬리 */}
            <div className="absolute top-[100%] left-[70%] -mt-[1px] h-0 w-0 border-x-8 border-t-[10px] border-x-transparent border-t-purple-50"></div>
            <SVGIcon
              name="smileBeer"
              size={80}
              className="absolute top-[120%] left-[65%] -translate-x-1/2"
            />{" "}
          </div>
        </div>
      )}
      <div className="flex w-full flex-col items-center gap-3">
        {totalLimit !== 0 && (
          <Button color="primary" onClick={() => router.push("./todayDrink")}>
            오늘의 한잔 기록하기
          </Button>
        )}
        {totalLimit ? (
          <Button
            color="accent"
            onClick={() => router.push("./monthlyLimit/edit")}
          >
            이달의 목표 수정하기
          </Button>
        ) : (
          <Button
            color="accent"
            size="m"
            onClick={() => router.push("./monthlyLimit/edit")}
          >
            이달의 목표 정하기
          </Button>
        )}
      </div>
    </div>
  );
}
