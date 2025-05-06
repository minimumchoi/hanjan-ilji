import { ModalListProp } from "@/types/propTypes";

export default function ModalList({
  flex = "row",
  name,
  value,
  unit,
}: ModalListProp) {
  const flexClass = flex === "col" ? "flex-col" : "flex-row";

  return (
    <li className={`flex ${flexClass} justify-between gap-4 text-lg font-bold`}>
      <span>{name}</span>
      <span>
        {value}
        {unit}
      </span>
    </li>
  );
}
