import CalendarUI from "@/components/calendarUI";
import { useRouter } from "next/router";
import { useState } from "react";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";

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

  return {
    props: {
      getMonth: currentMonth,
      getYear: currentYear,
      dailyDrinkData: data,
    },
  };
}

export default function Calendar({ getMonth, getYear, dailyDrinkData }) {
  const router = useRouter();

  console.log(dailyDrinkData);

  const handleMonth = (selectedMonth) => {
    router.push(`/calendar?month=${selectedMonth}`);
  };
  const handleDay = (year, month, day) => {
    router.push(`/todayDrinkList?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <CalendarUI
      month={getMonth}
      handleMonth={handleMonth}
      handleDay={handleDay}
      year={getYear}
    />
  );
}
