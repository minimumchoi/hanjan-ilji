import Image from "next/image";
import { RefObject } from "react";

type RuletModalProp = {
  modalRef: RefObject<HTMLDialogElement | null>;
  food: string;
  description: string;
  img: string;
  onClick: () => void;
};

export default function RouletteModal({
  modalRef,
  food,
  description,
  img,
  onClick,
}: RuletModalProp) {
  return (
    <dialog
      ref={modalRef}
      className="absolute top-1/4 mx-auto h-98 w-78 rounded-xl bg-white backdrop:bg-gray-300"
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
          className="box-border flex w-39 cursor-pointer flex-row items-center justify-center gap-2 border-r-1 border-gray-300"
          onClick={onClick}
        >
          <span>다시 돌리기</span>
        </button>
        <button
          type="button"
          className="w-39 cursor-pointer"
          onClick={() => modalRef.current?.close()}
        >
          닫기
        </button>
      </div>
    </dialog>
  );
}
