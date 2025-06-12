import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.js를 사용한다고 가정

const Calendar = () => {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1월은 0이므로 +1
  const [dates, setDates] = useState([]); // 달력에 표시될 날짜 배열

  useEffect(() => {
    generateCalendarDates(year, month);
  }, [year, month]);

  // 달력 날짜 생성 함수
  const generateCalendarDates = (currentYear, currentMonth) => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay(); // 해당 월의 첫 날 요일 (0:일, 6:토)
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate(); // 해당 월의 마지막 날짜

    const newDates = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      newDates.push(null); // 빈 칸으로 표시
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
      newDates.push(i);
    }

    setDates(newDates);
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };

  const handleClick = (day) => {
    if (day) {
      router.push(`/todayDrinkList?year=${year}&month=${month}&day=${day}`);
    }
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="p-6 pt-11">
      <div className="my-5 text-center">
        <select value={year} onChange={handleYearChange} className="mr-2 p-2">
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - 5 + i,
          ).map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
        <select value={month} onChange={handleMonthChange} className="p-2">
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
        {dates.map((day, index) => (
          <div
            key={index}
            className={`flex min-h-30 items-start justify-center border-gray-200 p-1 text-base ${day ? "text-text cursor-pointer bg-white" : "bg-gray-50 font-normal text-gray-400"} `}
            onClick={() => handleClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
