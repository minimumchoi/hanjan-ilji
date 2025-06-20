import { useRouter } from "next/router";
import { SVGIcon } from "./SVGIcon";

type MonthlyLimitCardProp = {
  limit?: number;
  resolution?: string;
};

export default function MonthlyLimitCard({
  limit,
  resolution,
}: MonthlyLimitCardProp) {
  const router = useRouter();

  const handleClick = () => {
    router.push("./monthlyLimit/edit");
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="w-36">
          <div className="text-lg font-bold">이번 달 목표</div>
          <span className="text-sm">
            {limit ? "이번 달의 나와의 약속" : "이달의 목표를 정해주세요"}
          </span>
        </div>
        {limit ? (
          <>
            <div className="border-l-2 border-gray-50"></div>
            <div className="flex w-36 flex-col items-center">
              <div className="text-[15px]">최대 음주 횟수</div>
              <span className="text-xl font-bold">{limit}회</span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {resolution ? (
        <div className="flex w-full flex-col rounded-2xl bg-yellow-50 px-8 py-6">
          <div className="mb-2 text-[15px]">다짐</div>
          <div className="text-lg font-bold">{resolution}</div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="flex w-full cursor-pointer flex-row items-center justify-center rounded-2xl bg-yellow-50 px-8 py-6"
        >
          <span className="text-base font-bold">이달의 목표 정하러 가기</span>
          <SVGIcon name="arrow" size={25} className="rotate-270" />
        </button>
      )}
    </div>
  );
}
