type DropBoxListProp = {
  listArr: string[];
  width: string;
  onClick: (value: string) => void;
  selected: string;
};

export default function DropDownList({
  listArr,
  width,
  onClick,
  selected,
}: DropBoxListProp) {
  return (
    <ul
      role="listbox"
      className={`${width} border-primary absolute top-13 z-10 mt-[3px] overflow-hidden rounded-xl border-3 bg-white shadow-md`}
    >
      {listArr.map((list) => (
        <li key={list} role="option" aria-selected={selected === list}>
          <button
            type="button"
            className={`hover:text-primary flex h-10 w-full items-center justify-center bg-purple-50 text-base font-semibold text-black transition-colors duration-150 hover:bg-gray-100`}
            onClick={() => onClick(list)}
          >
            {list}
          </button>
        </li>
      ))}
    </ul>
  );
}
