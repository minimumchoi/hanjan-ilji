import ProgressBar from "@/components/ProgressBar";
import { createClient } from "@/utils/supabase/server-props";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data: userData, error: userFetchingError } =
    await supabase.auth.getUser();

  if (userFetchingError || !userData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

  const { data: drinkData } = await supabase
    .from("dailyDrink")
    .select("*")
    .gte("created_at", startOfMonth.toISOString())
    .lte("created_at", endOfMonth.toISOString());

  const { data: limitData } = await supabase
    .from("MonthlyLimit")
    .select("*")
    .eq("month", currentMonth)
    .eq("year", currentYear)
    .single();

  return {
    props: {
      user: userData.user.user_metadata,
      drink: drinkData,
      limit: limitData,
    },
  };
}

export default function MyPage({ user, drink, limit }) {
  console.log(user);
  console.log(drink.length);
  console.log(limit.limit);
  return (
    <>
      <div className="mx-12 mt-24 flex flex-col gap-12.5">
        <div className="">
          <div className="text-2xl font-bold">{user.name}</div>
          <div className="text-sm">{user.email}</div>
        </div>
        <div className="px-2">
          <div className="text-lg font-bold">이번 달 진행률</div>
          <ProgressBar max={limit.limit} value={drink.length} />
        </div>
        {/* 이번달 목표 */}
        <div className="flex w-full flex-col">
          <div className="flex flex-row justify-between">
            <div>
              <div className="text-lg font-bold">이번 달 목표</div>
              <span className="text-sm">이번 달의 나와의 약속</span>
            </div>
            <div className="border-l-2 border-gray-50"></div>
            <div className="flex flex-col items-center">
              <div className="text-[15px]">최대 음주 횟수</div>
              <span className="text-xl font-bold">{limit.limit}회</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
