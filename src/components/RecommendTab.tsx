import { matchedFood } from "@/data/food";
import { useState } from "react";

export default function RecommendTab() {
  const drinkArr = ["소주", "맥주", "위스키", "와인"];
  const [tab, setTab] = useState(drinkArr[0]);
  const [showCount, setShowCount] = useState(3);

  const tabStyle =
    "text-text flex h-10 w-22 items-center justify-center rounded-t-xl text-lg font-bold cursor-pointer";

  const filtered = matchedFood.filter((d) => d.drinkType === tab);
  const filteredFood = filtered[0].food;

  console.log(filteredFood);

  return (
    <div>
      <ul className="flex flex-row">
        {drinkArr.map((d) => (
          <li
            className={`${d === tab ? `bg-purple-50` : `bg-gray-100`} ${tabStyle}`}
            key={d}
            onClick={() => {
              setTab(d);
              setShowCount(3);
            }}
          >
            {d}
          </li>
        ))}
      </ul>

      <div className="flex min-h-106 w-88 flex-col items-center gap-3 rounded-b-xl bg-purple-50 py-6">
        {filteredFood.slice(0, showCount).map((d) => (
          <article className="flex w-73 flex-row gap-5" key={d.name}>
            <div className="h-25 w-25 rounded-lg bg-purple-400"></div>
            <div className="text-text flex w-43 flex-1 flex-col justify-between text-start font-bold">
              <div className="h-6 text-xl">{d.name}</div>
              <div className="h-16 text-[0.8125rem]">{d.description} </div>
            </div>
          </article>
        ))}
        {showCount < filteredFood.length && (
          <button
            className="text-text mt-3 text-sm font-bold"
            onClick={() => {
              setShowCount((prev) => prev + 3);
            }}
          >
            다른 추천 안주 더 보기
          </button>
        )}
      </div>
    </div>
  );
}
