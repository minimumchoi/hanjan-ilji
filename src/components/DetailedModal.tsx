import { DetailedModalProp, ModalListProp } from "@/types/propTypes";
import ModalList from "./ModalList";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SVGIcon } from "./SVGIcon";

export default function DetailedModal({
  drinkData,
  onClose,
  onDelete,
}: DetailedModalProp) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const modalListData: ModalListProp[] = [
    { name: "마신 술", value: drinkData.drink },
    { name: "음주 량", value: drinkData.amount, unit: drinkData.unit },
    { name: "함께한 사람", value: drinkData.whom },
    { name: "기분", value: drinkData.feeling, flex: "col" },
  ];

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  const handleDelete = () => {
    onDelete(drinkData.id, () => {
      modalRef.current?.close();
      onClose();
    });
  };

  const handleEdit = () => {
    router.push(`./todayDrink/edit/${drinkData.id}`);
  };
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
        <div className="mt-4 flex w-full flex-row items-stretch justify-between px-4.5">
          <button
            type="button"
            className="flex h-7 w-7 cursor-pointer flex-row items-center justify-center"
            onClick={handleClose}
          >
            <SVGIcon name="close" size={20} className="text-text" />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 cursor-pointer flex-row items-center justify-center"
            onClick={handleDelete}
          >
            <SVGIcon name="trash" size={32} />
          </button>
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
          className="mt-6 flex h-13 w-13 cursor-pointer flex-row items-center justify-center rounded-full bg-gray-100 outline-none"
          onClick={handleEdit}
        >
          <SVGIcon name="edit" size={20} />
        </button>
      </div>
    </dialog>
  );
}
