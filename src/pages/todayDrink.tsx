import Button from "@/components/Button";
import DrinkInput from "@/components/DrinkInput";
import DropDown from "@/components/DropDown";
import { SVGIcon } from "@/components/SVGIcon";
import { useRouter } from "next/router";
import { useState } from "react";

const drinkArr = ["소주", "맥주", "막걸리", "위스키", "와인", "직접입력"];
const todayFeeling = [
  "매우 좋았어요",
  "그냥 그랬어요",
  "스트레스를 받았어요",
  "조금 우울했어요",
];
const drinkUnit = ["잔", "병"];

export default function TodayDrink() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    drinkType: "",
    amount: "",
    unit: "잔",
    withWhom: "",
    feeling: "",
  });
  const handleBackClick = () => {
    router.push("/home");
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const date = new Date();
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <div className="text-text flex flex-col px-9 pt-[8vh] pb-[12vh] font-bold">
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleBackClick}
      >
        <SVGIcon name="back" size={25}></SVGIcon>
      </button>
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">{formattedDate}</div>
          <h1 className="text-2xl">오늘의 한잔 🍺 </h1>
        </div>
        {/* 첫번째 질문 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">어떤술을 마셨나요?</div>
          <DropDown
            width="lg"
            listArr={drinkArr}
            value={formData.drinkType}
            onSelect={(value) => handleChange("drinkType", value)}
          ></DropDown>
        </div>
        {/* 두번째 질문 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">얼마나 마셨나요?</div>
          <div className="flex flex-row gap-5">
            <DrinkInput
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
            <DropDown
              width="sm"
              listArr={drinkUnit}
              value={formData.unit}
              onSelect={(value) => handleChange("unit", value)}
            ></DropDown>
          </div>
        </div>
        {/* 세번째 질문 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">누구와 함께 마셨나요?</div>
          <div className="flex flex-row gap-5">
            <DrinkInput
              type="text"
              value={formData.withWhom}
              onChange={(e) => handleChange("withWhom", e.target.value)}
            />
          </div>
        </div>
        {/* 네번째 질문 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">오늘의 기분은 어땠나요?</div>
          <DropDown
            onSelect={(value) => handleChange("feeling", value)}
            width="lg"
            listArr={todayFeeling}
            value={formData.feeling}
          ></DropDown>
        </div>
        <Button size="m" onClick={handleSubmit}>
          한잔 기록
        </Button>
      </div>
    </div>
  );
}
