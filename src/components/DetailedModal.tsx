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
  const modalListData: ModalListProp[] = [
    { name: "마신 술", value: drink },
    { name: "음주 량", value: quantity, unit: unit },
    { name: "함께한 사람", value: who },
    { name: "기분", value: feeling, flex: "col" },
  ];

  return (
    <dialog
      ref={modalRef}
      className="bg-background h-115 w-83 rounded-lg backdrop:bg-gray-300"
    >
      <div className="text-text flex w-full flex-col items-center justify-center">
        <div className="mt-2.5 flex w-full flex-row items-stretch justify-between px-4.5">
          <button
            type="button"
            className="box-border h-7 w-7 bg-purple-50 outline-none"
            onClick={() => modalRef.current?.close()}
          />
          <button
            type="button"
            className="box-border h-7 w-7 bg-purple-50 outline-none"
            onClick={() => modalRef.current?.close()}
          />
        </div>
        <ul className="mx-auto mt-12 flex flex-col gap-9 self-stretch">
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
        <button
          type="button"
          className="mt-6 h-13 w-13 rounded-full bg-gray-100 outline-none"
        ></button>
      </div>
    </dialog>
  );
}
