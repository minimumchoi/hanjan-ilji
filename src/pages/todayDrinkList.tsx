import DetailedModal from "@/components/DetailedModal";
import { SVGIcon } from "../components/SVGIcon";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { useRef } from "react";

type DrinkData = {
  feeling: string;
  drink: string;
  amount: number;
  unit: string;
};

type TodayDrinkListProp = {
  dateText: string;
  drinks: DrinkData[];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerClient(context);

  const year = Number(context.query.year);
  const month = Number(context.query.month);
  const day = Number(context.query.day);

  if (!year || !month || !day) {
    return {
      notFound: true,
    };
  }

  const startOfDay = new Date(year, month - 1, day, 0, 0, 0).toISOString();
  const endOfDay = new Date(
    year,
    month - 1,
    day,
    23,
    59,
    59,
    999,
  ).toISOString();

  const { data, error } = await supabase
    .from("dailyDrink")
    .select("*")
    .gte("created_at", startOfDay)
    .lte("created_at", endOfDay);

  const drinks = (data || []).map((d) => ({
    feeling: d.feeling,
    drink: d.drinkType,
    amount: d.amount,
    unit: d.unit,
  }));

  return {
    props: {
      dateText: `${year}년 ${month}월 ${day}일`,
      drinks,
    },
  };
}

export default function TodayDrinkList({
  drinks,
  dateText,
}: TodayDrinkListProp) {
  const feelingMap: Record<string, string> = {
    "스트레스를 받았어요": "🤯",
    "매우 좋았어요": "😆",
    "그냥 그랬어요": "🙂",
    "우울했어요": "😢",
  };
  const handleClick = () => {};

  return (
    <div className="relative h-screen w-full bg-gray-300">
      <h2 className="pt-[12vh] pl-5 text-[1.375rem] font-bold">{dateText}</h2>
      {/* 리스트 */}
      <div className="bg-background absolute bottom-15 flex h-[80vh] w-full flex-col items-center overflow-y-auto rounded-t-[20px] px-9 pt-4">
        <div className="h-1 w-12 rounded-2xl bg-gray-300"></div>
        <ul className="mt-14 flex w-full flex-col items-center justify-center gap-4.5">
          {drinks.map((d) => (
            <li
              className="bg-accent flex h-13 w-full items-center rounded-2xl px-7.5 text-lg font-semibold"
              key={d.drink + d.amount + d.feeling}
            >
              <button
                type="button"
                className="flex h-full w-full cursor-pointer items-center border-none bg-transparent p-0 text-left"
                onClick={handleClick}
              >
                <span>{feelingMap[d.feeling]}</span>
                <span className="ml-3">{d.drink}</span>
                <span className="ml-1.5">{d.amount}</span>
                <span>{d.unit}</span>
                <span className="ml-auto">
                  <SVGIcon name="return" size={20} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
