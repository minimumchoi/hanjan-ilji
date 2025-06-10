import DetailedModal from "@/components/DetailedModal";
import { SVGIcon } from "../components/SVGIcon";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { DrinkData } from "@/types/propTypes";

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
    id: d.id,
    whom: d.withWhom,
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
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState<number | null>(
    null,
  );

  const feelingMap: Record<string, string> = {
    "스트레스를 받았어요": "🤯",
    "매우 좋았어요": "😆",
    "그냥 그랬어요": "🙂",
    "우울했어요": "😢",
  };
  const handleClick = (index: number) => () => {
    setSelectedDrinkIndex(index);
  };

  const handleCloseDetailed = () => {
    setSelectedDrinkIndex(null);
  };
  console.log(drinks);

  return (
    <div className="relative h-screen w-full bg-gray-300">
      <h2 className="pt-[15vh] pl-5 text-[1.375rem] font-bold">{dateText}</h2>
      {/* 리스트 */}
      {selectedDrinkIndex === null && (
        <div className="bg-background absolute bottom-0 left-0 flex h-[75vh] w-full flex-col items-center overflow-auto rounded-t-[20px] border-none px-9 pt-4">
          <div className="mb-2 h-1 w-12 rounded-2xl bg-gray-300"></div>
          <ul className="mt-6 flex w-full flex-col items-center justify-center gap-4.5">
            {drinks.length === 0 ? (
              <span className="flex text-sm">이날의 기록이 없습니다</span>
            ) : (
              drinks.map((d, i) => (
                <li
                  key={d.id}
                  className="bg-accent flex h-13 w-full items-center rounded-2xl px-7.5 text-lg font-semibold"
                >
                  <button
                    type="button"
                    className="flex h-full w-full cursor-pointer items-center border-none bg-transparent p-0 text-left"
                    onClick={handleClick(i)}
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
              ))
            )}
          </ul>
        </div>
      )}
      {selectedDrinkIndex !== null && (
        <DetailedModal
          onClose={handleCloseDetailed}
          drinkData={drinks[selectedDrinkIndex]}
        />
      )}
    </div>
  );
}
