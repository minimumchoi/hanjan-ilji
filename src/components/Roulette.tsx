import { useEffect, useState } from "react";
import { SVGIcon } from "./SVGIcon";

const segmentCount = 6;
const colors = ["#a78bfa", "#fff0c2"]; // 보라, 연노랑

type Props = {
  shouldSpin: boolean;
  onSpinEnd: () => void;
};

export default function Roulette({ shouldSpin, onSpinEnd }: Props) {
  const [rotateDeg, setRotateDeg] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (shouldSpin && !spinning) {
      const extraSpins = 3.5;
      const totalRotation = 360 * extraSpins;

      setSpinning(true);
      setRotateDeg((prev) => prev + totalRotation);

      setTimeout(() => {
        setSpinning(false);
        onSpinEnd();
      }, 3000);
    }
  }, [shouldSpin, spinning, onSpinEnd]);

  const background = Array.from({ length: segmentCount }, (_, i) => {
    const start = (i / segmentCount) * 360;
    const end = ((i + 1) / segmentCount) * 360;
    return `${colors[i % 2]} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div className="relative h-64 w-64 rounded-full">
      <div
        className="absolute inset-0 rounded-full transition-transform duration-[3000ms] ease-out"
        style={{
          transform: `rotate(${rotateDeg}deg)`,
          background: `conic-gradient(${background})`,
        }}
      />
      <SVGIcon
        name="questionMark"
        size={80}
        className="absolute top-1/2 left-1/2 z-10 -translate-x-2/5 -translate-y-1/2"
      />
    </div>
  );
}
