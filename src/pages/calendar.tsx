import CalendarUI from "@/components/CalendarUI";
import { DrinkData } from "@/types/propTypes";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerClient(context);

  const currentMonth = Number(context.query.month);
  const currentYear = new Date().getFullYear();

  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

  const { data, error } = await supabase
    .from("dailyDrink")
    .select("*")
    .gte("created_at", startOfMonth.toISOString())
    .lte("created_at", endOfMonth.toISOString());

  if (error) {
    console.error(error);
    return {
      props: {
        error: "달력 데이터를 불러오는 데 실패했습니다.",
        currentMonth,
        currentYear,
        drinkRecords: [],
      },
    };
  }

  const monthlyDrinkList = (data || []).map((d) => ({
    feeling: d.feeling,
    drink: d.drinkType,
    amount: d.amount,
    unit: d.unit,
    id: d.id,
    whom: d.withWhom,
    created: d.created_at,
  }));

  return {
    props: {
      error: error || null,
      currentMonth,
      currentYear,
      monthlyDrinkList,
    },
  };
}

type CalendarProp = {
  currentMonth: number;
  currentYear: number;
  monthlyDrinkList: DrinkData[];
  error: string | null;
};

export default function Calendar({
  error,
  currentMonth,
  currentYear,
  monthlyDrinkList,
}: CalendarProp) {
  const router = useRouter();

  const handleMonth = (selectedMonth: number) => {
    router.push(`/calendar?month=${selectedMonth}`);
  };
  const handleDay = (year: number, month: number, day: number) => {
    router.push(`/todayDrinkList?year=${year}&month=${month}&day=${day}`);
  };

  if (error) {
    return <div>달력 데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <CalendarUI
      month={currentMonth}
      year={currentYear}
      handleMonth={handleMonth}
      handleDay={handleDay}
      monthlyDrinkList={monthlyDrinkList}
    />
  );
}
