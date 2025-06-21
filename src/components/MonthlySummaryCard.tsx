import { useRouter } from "next/router";
import { SVGIcon } from "./SVGIcon";

type MonthlySummaryCardProp = {
  frequentDrink: string;
  totalDrinkCount: number;
};

export default function MonthlySummaryCard({
  frequentDrink,
  totalDrinkCount,
}: MonthlySummaryCardProp) {
  const router = useRouter();

  const handleClick = () => {
    router.push("./todayDrink");
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <div className="text-lg font-bold">이달의 요약</div>
          <span className="text-sm">
            {totalDrinkCount
              ? "이번 달은 이렇게 마셨어요"
              : "이번달은 아직 음주 기록이 없어요"}
          </span>
        </div>
      </div>
      {totalDrinkCount ? (
        <div className="flex min-h-33 w-full flex-col justify-between rounded-2xl bg-purple-50 px-9 py-6">
          <div className="flex h-7 flex-row items-center justify-between">
            <div className="mr-2 text-[15px]">총 음주 횟수</div>
            <div className="w-25 text-center text-lg font-bold">
              {totalDrinkCount}회
            </div>
          </div>
          <div className="flex h-7 flex-row items-center justify-between">
            <div className="mr-2 text-[15px]">가장 자주 마신 술</div>
            <div className="w-25 text-center text-lg font-bold">
              {frequentDrink}
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="flex w-full cursor-pointer flex-row items-center justify-center rounded-2xl bg-purple-50 px-9 py-6"
        >
          <div className="text-base font-bold">오늘의 한잔 기록하러 가기</div>
          <SVGIcon name="arrow" size={25} className="rotate-270" />
        </button>
      )}
    </div>
  );
}
