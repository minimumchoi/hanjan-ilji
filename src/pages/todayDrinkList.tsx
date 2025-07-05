import DetailedModal from "@/components/DetailedModal";
import { DrinkData } from "@/types/propTypes";
import { createClient } from "@/utils/supabase/component";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SVGIcon } from "../components/SVGIcon";

type TodayDrinkListProp = {
  dateText: string;
  drinks: DrinkData[];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerClient(context);

  // const {
  //   data: { user },
  //   error: userFetchingError,
  // } = await supabase.auth.getUser();

  // if (userFetchingError || !user) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

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

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

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
  const router = useRouter();
  const supabase = createClient();
  const [drinkList, setDrinkList] = useState(drinks);

  const [isVisible, setIsVisible] = useState(false);

  const [isGoingBack, setIsGoingBack] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const feelingMap: Record<string, string> = {
    "스트레스를 받았어요": "🤯",
    "매우 좋았어요": "😆",
    "그냥 그랬어요": "🙂",
    "조금 우울했어요": "😢",
  };
  const handleClick = (index: number) => () => {
    setSelectedDrinkIndex(index);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    const { error } = await supabase.from("dailyDrink").delete().eq("id", id);

    if (error) {
      console.error("삭제 실패", error);
      return;
    }
    setDrinkList((prev) => prev.filter((drink) => drink.id !== id));
    setSelectedDrinkIndex(null);
  };

  const handleCloseDetailed = () => {
    setSelectedDrinkIndex(null);
  };

  const handleBack = () => {
    if (isGoingBack) {
      return;
    }
    setIsGoingBack(true);
    router.back();
  };

  return (
    <div className="relative h-screen w-full bg-gray-300">
      <div className="pt-[15vh] pb-[5.5vh] pl-5" onClick={handleBack}>
        <h2 className="text-[1.375rem] font-bold">{dateText}</h2>
      </div>
      {/* 리스트 */}
      {selectedDrinkIndex === null && (
        <div
          className={`bg-background absolute bottom-0 left-0 flex h-[75vh] w-full flex-col items-center overflow-auto rounded-t-[20px] border-none px-9 pt-4 transition-all duration-500 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="mb-2 h-1 w-12 rounded-2xl bg-gray-300"></div>
          <ul className="mt-6 flex w-full flex-col items-center justify-center gap-4.5">
            {drinkList.length === 0 ? (
              <span className="flex text-sm">이날의 기록이 없습니다</span>
            ) : (
              drinkList.map((d, i) => (
                <li
                  key={d.id}
                  className="bg-accent flex h-13 w-full items-center rounded-2xl px-7.5 text-lg font-semibold"
                >
                  <div
                    role="button"
                    className="flex h-full w-full cursor-pointer items-center border-none bg-transparent p-0 text-left"
                    onClick={handleClick(i)}
                  >
                    <span>{feelingMap[d.feeling]}</span>
                    <span className="ml-3">{d.drink}</span>
                    <span className="ml-1.5">{d.amount}</span>
                    <span>{d.unit}</span>
                    <button
                      type="button"
                      className="ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(d.id);
                      }}
                    >
                      <SVGIcon name="close" size={15} className="text-text" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      {selectedDrinkIndex !== null && (
        <DetailedModal
          onClose={handleCloseDetailed}
          drinkData={drinkList[selectedDrinkIndex]}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
