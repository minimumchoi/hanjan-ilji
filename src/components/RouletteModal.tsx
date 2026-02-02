import Image from "next/image";
import { memo } from "react";

type RuletModalProp = {
  food: string;
  description: string;
  img: string;
  resetClick: () => void;
  closeClick: () => void;
};

function RouletteModal({
  food,
  description,
  img,
  resetClick,
  closeClick,
}: RuletModalProp) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="z-50 w-78 rounded-xl bg-white shadow-lg"
    >
      <div className="text-text flex h-80 flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold"> 오늘의 안주는...! </h1>
        <div className="relative h-32 w-32">
          <Image
            src={img}
            fill
            alt={`${food}사진`}
            sizes="128px"
            className="object-cover"
          ></Image>
        </div>
        <div className="text-xl font-bold">🎉 {food} 🎉</div>
        <div className="h-10 w-49 text-center text-sm font-semibold">
          {description}
        </div>
      </div>
      <div className="flex h-18 w-full flex-row border-t border-gray-300 font-semibold">
        <button
          type="button"
          className="box-border flex w-39 cursor-pointer flex-row items-center justify-center gap-2 border-r border-gray-300"
          onClick={resetClick}
        >
          <span>다시 돌리기</span>
        </button>
        <button
          type="button"
          className="w-39 cursor-pointer"
          onClick={closeClick}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default memo(RouletteModal);
