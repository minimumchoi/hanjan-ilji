import Button from "@/components/Button";
import DrinkInput from "@/components/DrinkInput";
import DropDown from "@/components/DropDown";
import { SVGIcon } from "@/components/SVGIcon";
import { drinkArr, drinkUnit, todayFeeling } from "@/data/drinkRecord";
import { createClient } from "@/utils/supabase/component";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import {
  isValidAmount,
  isValidDrinkType,
  isValidFeeling,
  isValidWithWhom,
} from "@/utils/todayDrinkValidaion";
// import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const supabase = createServerClient(context);

//   const {
//     data: { user },
//     error: userFetchingError,
//   } = await supabase.auth.getUser();

//   if (userFetchingError || !user) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }

export default function TodayDrink() {
  const supabase = createClient();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    drinkType: "",
    amount: "",
    unit: "잔",
    withWhom: "",
    feeling: "",
  });
  const [formErrors, setFormErrors] = useState({
    drinkType: "",
    amount: "",
    withWhom: "",
    feeling: "",
  });

  const [disabled, setDisabled] = useState(false);

  const [CustomDrinkType, setCustomDrinkType] = useState("");

  const [isGoingBack, setIsGoingBack] = useState(false);

  const handleBackClick = () => {
    if (isGoingBack) return;
    setIsGoingBack(true);
    router.back();
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async () => {
    const { drinkType, amount, unit, withWhom, feeling } = formData;

    const drinkTypeError = isValidDrinkType(drinkType, CustomDrinkType);
    const amountError = isValidAmount(amount);
    const withWhomError = isValidWithWhom(withWhom);
    const feelingError = isValidFeeling(feeling);

    // 에러가 있다면 상태로 저장하고 제출 막기
    if (drinkTypeError || amountError || withWhomError || feelingError) {
      setFormErrors({
        drinkType: drinkTypeError || "",
        amount: amountError || "",
        withWhom: withWhomError || "",
        feeling: feelingError || "",
      });
      return;
    }
    setFormErrors({
      drinkType: "",
      amount: "",
      withWhom: "",
      feeling: "",
    });
    setDisabled(true);
    // drinkType 직접입력인 경우 구분
    const finalDrinkType =
      drinkType === "직접입력" ? CustomDrinkType : drinkType;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("dailyDrink").insert({
      drinkType: finalDrinkType,
      amount,
      unit,
      withWhom,
      feeling,
      user_id: user?.id,
    });

    if (error) {
      console.error("데이터 업로드 실패", error);
      setDisabled(false);
      return;
    }
    console.log("데이터 업로드 성공", formData);
    router.back();
  };

  const date = new Date();
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  // 직접입력 선택시 하단 DrinkInput에 포커스
  useEffect(() => {
    if (formData.drinkType === "직접입력" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [formData.drinkType]);

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

        {/* 술종류 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">어떤 술을 마셨나요?</div>
          <DropDown
            width="lg"
            listArr={drinkArr}
            value={formData.drinkType}
            onSelect={(value) => {
              handleChange("drinkType", value);
            }}
          ></DropDown>
          {formData.drinkType === "직접입력" && (
            <DrinkInput
              ref={inputRef}
              type="text"
              value={CustomDrinkType}
              onChange={(e) => setCustomDrinkType(e.target.value)}
            />
          )}
          {formErrors.drinkType && (
            <span className="mt-1 text-base font-normal text-red-500">
              {formErrors.drinkType}
            </span>
          )}
        </div>

        {/* 음주량 */}
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
          {formErrors.amount && (
            <span className="mt-1 text-base font-normal text-red-500">
              {formErrors.amount}
            </span>
          )}
        </div>

        {/* 음주메이트 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">누구와 함께 마셨나요?</div>
          <div className="flex flex-row gap-5">
            <DrinkInput
              type="text"
              value={formData.withWhom}
              onChange={(e) => handleChange("withWhom", e.target.value)}
            />
          </div>
          {formErrors.withWhom && (
            <span className="mt-1 text-base font-normal text-red-500">
              {formErrors.withWhom}
            </span>
          )}
        </div>

        {/* 감정 기록 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">오늘의 기분은 어땠나요?</div>
          <DropDown
            onSelect={(value) => handleChange("feeling", value)}
            width="lg"
            listArr={todayFeeling}
            value={formData.feeling}
          ></DropDown>
          {formErrors.feeling && (
            <span className="text-base font-normal text-red-500">
              {formErrors.feeling}
            </span>
          )}
        </div>

        <Button size="m" onClick={handleSubmit} disabled={disabled}>
          한잔 기록
        </Button>
      </div>
    </div>
  );
}
