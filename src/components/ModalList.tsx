import { ModalListProp } from "@/types/propTypes";

export default function ModalList({
  flex = "row",
  name,
  value,
  unit,
}: ModalListProp) {
  const flexClass = flex === "col" ? "flex-col gap-3" : "flex-row h-9 gap-4";

  return (
    <li
      className={`flex ${flexClass} w-59 justify-between border-b border-b-gray-300 font-bold last:border-b-0`}
    >
      <span className="text-base">{name}</span>
      <span className="text-xl">
        {value}
        {unit}
      </span>
    </li>
  );
}
