import Button from "@/components/Button";
import Roulette from "@/components/Roulette";
import RuletButton from "@/components/RuletButton";

export default function Food() {
  const handleRuletClick = () => {};
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="mt-24 flex flex-col items-center">
        <h1 className="text-2xl font-bold">오늘 뭐 먹지?</h1>
        <span className="text-sm font-bold">
          다양한 안주를 랜덤으로 추천해드려요 🎲
        </span>
      </div>
      <Roulette />
      <RuletButton />
    </div>
  );
}
