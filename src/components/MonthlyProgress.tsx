import { useEffect, useMemo, useState } from "react";
import { feedback } from "@/data/feedback";
import ProgressBar from "./ProgressBar";
import { splitText } from "@/utils/utils";

type DrinkProgressCardProp = {
  totalLimit: number;
  drinkCount: number;
};

export default function MonthlyProgress({
  totalLimit,
  drinkCount,
}: DrinkProgressCardProp) {
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    const rateNumber = Math.round((drinkCount / totalLimit) * 100);

    const messageLabel = (() => {
      if (rateNumber <= 0) return "시작";
      if (rateNumber <= 25) return "응원";
      if (rateNumber <= 50) return "중간 이하";
      if (rateNumber <= 75) return "중간 이상";
      if (rateNumber < 100) return "절제";
      if (rateNumber === 100) return "달성";
      return "리마인드";
    })();

    const found = feedback.find((d) => d.style === messageLabel);
    if (found && found.messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * found.messages.length);
      setRandomMessage(found.messages[randomIndex]);
    }
  }, [drinkCount, totalLimit]);

  const [line1, line2] = useMemo(
    () => splitText(randomMessage),
    [randomMessage],
  );

  return (
    <section className="flex w-86 flex-col items-center gap-6 rounded-2xl bg-purple-50 pt-9 pb-12">
      <div className="text-text h-16 w-49 text-center text-xl font-bold">
        🔥 이번 달 허용량 🔥
        <div className="text-2xl">{totalLimit}회</div>
      </div>
      <div className="text-text h-16 w-49 text-center text-xl font-bold">
        🍺 지금까지 🍺
        <div className="text-2xl">{drinkCount}회</div>
      </div>
      <ProgressBar value={drinkCount} max={totalLimit} />
      <div className="text-text w-60 text-center text-lg font-bold">
        {randomMessage.includes("<br/>") ? (
          randomMessage.split("<br/>").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))
        ) : (
          <span>{randomMessage}</span>
        )}
      </div>
    </section>
  );
}
