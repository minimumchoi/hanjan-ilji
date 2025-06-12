import { useEffect, useState } from "react";

export default function CalendarUI({
  month,
  handleMonth,
  handleDay,
  year,
  dailyDrinkData,
}) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    generateCalendarDates(year, month);
  }, [year, month]);

  const generateCalendarDates = (currentYear, currentMonth) => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    const newDates = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      newDates.push(null);
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
      newDates.push(i);
    }

    setDates(newDates);
  };

  const handleMonthChange = (e) => {
    handleMonth(parseInt(e.target.value));
  };

  const handleClickDay = (day) => {
    if (day) {
      handleDay(year, month, day);
    }
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const getDrinkColorClass = (drinkType: string): string => {
    switch (drinkType) {
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
      default:
        return "bg-blue-500";
    }
  };
  return (
    <div className="p-6 pt-[5vh]">
      <div className="my-5 ml-3 text-2xl font-bold">
        <span className="mr-2">{year}년</span>
        <select value={month} onChange={handleMonthChange} className="">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-7 pb-2.5 text-center text-[12px] text-gray-400">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {dates.map((day, index) => {
          // 해당 날짜에 해당하는 데이터 필터링
          const dailyRecords = day
            ? dailyDrinkData.filter((record) => {
                const recordDate = new Date(record.created_at);
                return (
                  recordDate.getFullYear() === year &&
                  recordDate.getMonth() + 1 === month &&
                  recordDate.getDate() === day
                );
              })
            : [];

          return (
            <div
              key={index}
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
                  {dailyRecords.map((record, recordIndex) => (
                    <div
                      key={recordIndex}
                      className={`h-3 w-full rounded-md text-base ${getDrinkColorClass(record.drinkType)}`}
                      title={`${record.drinkType} ${record.amount}${record.unit}`}
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
