import { DetailedModalProp, ModalListProp } from "@/types/propTypes";
import ModalList from "./ModalList";

export default function DetailedModal({
  modalRef,
  date,
  drink,
  quantity,
  unit,
  who,
  feeling,
}: DetailedModalProp) {
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const modalListData: ModalListProp[] = [
    { name: "🍶 마신 술", value: drink },
    { name: "🥃 음주 량", value: quantity, unit: unit },
    { name: "👫 함께한 사람", value: who },
    { name: "😄 기분", value: feeling, flex: "col" },
  ];

  return (
    <dialog
      ref={modalRef}
      className="bg-accent h-123 w-83 rounded-lg backdrop:bg-gray-300"
    >
      <div className="text-text flex w-full flex-col items-center justify-center">
        <div className="mt-8 h-8 w-36 text-xl font-bold">{formattedDate}</div>
        <ul className="mx-10 mt-10 flex flex-col gap-8 self-stretch">
          {modalListData.map((d) => (
            <ModalList
              key={d.name}
              name={d.name}
              value={d.value}
              unit={d.unit}
              flex={d.flex}
            />
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 border-t-1 text-lg font-bold">
        <button
          type="button"
          className="border-text box-border h-20 w-[166px] border-r-1 bg-purple-50 outline-none"
        >
          수정하기
        </button>
        <button
          type="button"
          className="box-border h-20 w-[166px] bg-purple-50 outline-none"
          onClick={() => modalRef.current?.close()}
        >
          닫기
        </button>
      </div>
    </dialog>
  );
}
