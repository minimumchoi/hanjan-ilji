import { RefObject } from "react";

type TodayDrinkListProp = {
  date?: number;
  drinkList?: string[];
  modalRef?: RefObject<HTMLDialogElement>;
};

const arr = [
  { icon: "😀", drink: "소주", amount: 3, unit: "잔", delete: "😀" },
  { icon: "😀", drink: "맥주", amount: 1, unit: "병", delete: "😀" },
  { icon: "😀", drink: "양주", amount: 3, unit: "잔", delete: "😀" },
  { icon: "😀", drink: "막걸리", amount: 6, unit: "잔", delete: "😀" },
];

export default function TodayDrinkList({
  date = "2025년 4월 1일",
  drinkList,
  modalRef,
}: TodayDrinkListProp) {
  return (
    <div className="h-screen w-full bg-gray-300">
      <h2 className="pt-[12vh] pl-5 text-[1.375rem] font-bold">{date}</h2>
      {/* 리스트 */}
      <div className="bg-background absolute bottom-15 flex h-[80vh] w-full flex-col items-center overflow-scroll rounded-t-[20px] px-9 pt-4">
        <div className="h-1 w-12 rounded-2xl bg-gray-300"></div>
        <ul className="mt-14 flex w-full flex-col items-center justify-center gap-4.5">
          {arr.map((d) => (
            <li
              className="bg-accent flex h-13 w-full items-center rounded-2xl px-7.5"
              key={d.drink}
            >
              <span className="">{d.icon}</span>
              <span className="ml-3">{d.drink}</span>
              <span className="ml-1.5">{d.amount}</span>
              <span className="">{d.unit}</span>
              <span className="ml-auto">{d.delete}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
