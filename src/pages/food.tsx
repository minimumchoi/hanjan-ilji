import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Roulette from "@/components/Roulette";
import { ruletFood } from "@/data/food";
import RouletteModal from "@/components/RouletteModal";

export default function Food() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [shouldSpin, setShouldSpin] = useState(false);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const handleSpinClick = () => {
    if (shouldSpin) return;
    setShouldSpin(true);
  };

  const handleSpinEnd = () => {
    const index = Math.floor(Math.random() * ruletFood.length);
    setRandomIndex(index);
  };

  const handleReset = () => {
    modalRef.current?.close();
    setShouldSpin(true);
  };

  useEffect(() => {
    if (randomIndex !== null && modalRef.current) {
      modalRef.current?.showModal();
    }
  }, [randomIndex]);

  return (
    <div className="flex flex-col items-center gap-9">
      <div className="mt-24 flex flex-col items-center">
        <h1 className="text-2xl font-bold">오늘 뭐 먹지?</h1>
        <span className="text-sm font-bold">
          다양한 안주를 랜덤으로 추천해드려요 🎲
        </span>
      </div>

      <Roulette
        shouldSpin={shouldSpin}
        onSpinEnd={() => {
          setShouldSpin(false);
          handleSpinEnd();
        }}
      />

      <Button size="s" color="primary" onClick={handleSpinClick}>
        룰렛돌리기
      </Button>

      {randomIndex !== null && (
        <RouletteModal
          img="이미지 넣기"
          modalRef={modalRef}
          food={ruletFood[randomIndex].name}
          description={ruletFood[randomIndex].description}
          onClick={handleReset}
        />
      )}
    </div>
  );
}
