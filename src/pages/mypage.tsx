import MonthlyLimitCard from "@/components/monthlyLimitCard";
import MonthlySummaryCard from "@/components/MonthlySummaryCard";
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

  const { data: drinkData = [] } = await supabase
    .from("dailyDrink")
    .select("*")
    .gte("created_at", startOfMonth.toISOString())
    .lte("created_at", endOfMonth.toISOString());

  const { data: limitData } = await supabase
    .from("MonthlyLimit")
    .select()
    .match({ month: currentMonth, year: currentYear })
    .single();

  return {
    props: {
      user: userData.user.user_metadata,
      drink: drinkData,
      limit: limitData,
    },
  };
}

type Drink = {
  drinkType: string;
};

type Limit = {
  limit: number;
  resolution: string;
} | null;

type User = {
  name: string;
  email: string;
};

type MyPageProps = {
  user: User;
  drink: Drink[];
  limit: Limit;
};

export default function MyPage({ user, drink, limit }: MyPageProps) {
  const arr = drink.map((d) => d.drinkType);

  const countMap = arr.reduce<Record<string, number>>((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(countMap));
  const mostFrequentItems = Object.keys(countMap).filter(
    (key) => countMap[key] === maxCount,
  );

  const frequentDrink = mostFrequentItems.join(", ");

  return (
    <>
      <div className="text-text mx-12 mt-24 flex flex-col gap-12.5">
        <div className="">
          <div className="text-2xl font-bold">{user.name}</div>
          <div className="text-sm">{user.email}</div>
        </div>
        <div className="px-2">
          <div className="text-lg font-bold">이번 달 진행률</div>
          <span className="text-sm">이번 달 목표는 잘 지켜지고 있나요?</span>
          <ProgressBar max={3} value={drink.length} />
        </div>
        <MonthlyLimitCard
          limit={limit?.limit ?? 0}
          resolution={limit?.resolution ?? ""}
        />
        <MonthlySummaryCard
          frequentDrink={frequentDrink}
          totalDrinkCount={drink.length}
        />
      </div>
    </>
  );
}
