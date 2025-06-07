import { DetailedModalProp, ModalListProp } from "@/types/propTypes";
import ModalList from "./ModalList";
import { useEffect, useRef } from "react";

export default function DetailedModal({
  drinkData,
  onClose,
}: DetailedModalProp) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const modalListData: ModalListProp[] = [
    { name: "마신 술", value: drinkData.drink },
    { name: "음주 량", value: drinkData.amount, unit: drinkData.unit },
    { name: "함께한 사람", value: drinkData.whom },
    { name: "기분", value: drinkData.feeling, flex: "col" },
  ];

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  const handleEdit = () => {};
  const handleClose = () => {
    modalRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={modalRef}
      className="bg-background fixed top-1/2 left-1/2 h-115 w-83 -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop:bg-gray-300"
    >
      <div className="text-text flex w-full flex-col items-center justify-center">
        <div className="mt-2.5 flex w-full flex-row items-stretch justify-between px-4.5">
          <button
            type="button"
            className="box-border h-7 w-7 bg-purple-50 outline-none"
            onClick={handleClose}
          />
          <button
            type="button"
            className="box-border h-7 w-7 bg-purple-50 outline-none"
            onClick={handleClose}
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
          onClick={handleEdit}
        ></button>
      </div>
    </dialog>
  );
}
