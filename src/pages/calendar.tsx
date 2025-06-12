import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const Calendar = () => {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
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
        {dates.map((day, index) => (
          <div
            key={index}
            className="flex min-h-[15vh] flex-col items-center gap-2 p-1"
          >
            <div
              className={`items-start text-base ${day ? "text-text cursor-pointer bg-white" : "bg-gray-50 font-normal text-gray-400"} `}
              onClick={() => handleClick(day)}
            >
              {day}
            </div>
            {/* {index === 3 ? (
              <div className="flex w-full flex-col gap-1">
                <div className="h-2.5 w-full rounded-md bg-amber-400"></div>
                <div className="h-2.5 w-full rounded-md bg-amber-400"></div>
                <div className="h-2.5 w-full rounded-md bg-amber-400"></div>
              </div>
            ) : (
              <></>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
