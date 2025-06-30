import { DrinkData } from "@/types/propTypes";
import { useEffect, useState } from "react";
import { SVGIcon } from "./SVGIcon";

type CalendarUIProp = {
  month: number;
  year: number;
  handleMonth: (month: number) => void;
  handleDay: (year: number, month: number, day: number) => void;
  monthlyDrinkList: DrinkData[];
};

export default function CalendarUI({
  month,
  handleMonth,
  handleDay,
  year,
  monthlyDrinkList,
}: CalendarUIProp) {
  const [dates, setDates] = useState<(number | null)[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(month);

  useEffect(() => {
    generateCalendarDates(year, month);
  }, [year, month]);

  const generateCalendarDates = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    const newDates = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      newDates.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
      newDates.push(i);
    }

    setDates(newDates);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    handleMonth(month);
  };

  const handleClickDay = (day: number | null) => {
    if (day) {
      handleDay(year, month, day);
    }
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const getDrinkColorClass = (drink: string): string => {
    switch (drink) {
      case "소주":
        return "bg-green-500";
      case "맥주":
        return "bg-yellow-400";
      case "막걸리":
        return "bg-orange-500";
      case "위스키":
        return "bg-purple-500";
      case "와인":
        return "bg-red-700";
      case "사케":
        return "bg-fuchsia-500";
      case "하이볼":
        return "bg-blue-400";
      default:
        return "bg-blue-500";
    }
  };
  return (
    <div className="p-6 pt-[5vh]">
      <div className="my-5 ml-3 flex h-10 flex-row items-center text-2xl font-bold">
        <span className="mr-2">{year}년</span>
        <div
          className="relative flex flex-row items-center gap-1.5"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen && (
            <ul className="absolute top-0 flex w-15 flex-col gap-1.5 rounded-lg bg-gray-100 py-1 text-center text-xl font-semibold">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <li
                  key={m}
                  onClick={() => {
                    handleMonthChange(m);
                  }}
                >
                  {m}월
                </li>
              ))}
            </ul>
          )}
          {selectedMonth}월
          <SVGIcon name="arrow" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-7 pb-2.5 text-center text-[12px] text-gray-400">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {dates.map((day, idx) => {
          // 해당 날짜에 해당하는 데이터 필터링
          const dailyRecords = day
            ? monthlyDrinkList.filter((record) => {
                const recordDate = new Date(record.created);
                return (
                  recordDate.getFullYear() === year &&
                  recordDate.getMonth() + 1 === month &&
                  recordDate.getDate() === day
                );
              })
            : [];

          return (
            <div
              key={idx}
              className="flex min-h-[15vh] flex-col items-center gap-2 p-1"
              onClick={() => handleClickDay(day)}
            >
              <div
                className={`items-start text-base ${
                  day
                    ? "text-text cursor-pointer bg-white"
                    : "bg-gray-50 font-normal text-gray-400"
                } `}
              >
                {day}
              </div>

              {dailyRecords.length > 0 && (
                <div className="flex w-full flex-col gap-1">
                  {dailyRecords.map((record, idx) => (
                    <div
                      key={record.drink + idx}
                      className={`h-3 w-full rounded-md text-base ${getDrinkColorClass(record.drink)}`}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
