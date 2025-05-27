import Button from "@/components/Button";
import DrinkInput from "@/components/DrinkInput";
import { SVGIcon } from "@/components/SVGIcon";
import { useUser } from "@/contexts/userContext";
import { createClient } from "@/utils/supabase/component";
import {
  isVaildResolution,
  isValidMaxAmount,
} from "@/utils/todayDrinkValidaion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MonthlyLimit() {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({ limit: "", resolution: "" });
  const [formErrors, setFormErrors] = useState({
    limit: "",
    resolution: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const fetchSesstion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);
    };
    fetchSesstion();

    const fetchMonthlyLimit = async () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      const { data, error } = await supabase
        .from("MonthlyLimit")
        .select("*")
        .eq("user_id", user?.id)
        .eq("year", currentYear)
        .eq("month", currentMonth)
        .single();

      if (error) {
        console.error("데이터 패칭 실패", error);
        return;
      }
      setIsEdit(true);
      setFormData((prev) => ({
        ...prev,
        limit: data.limit,
        resolution: data.resolution,
      }));
    };
    fetchMonthlyLimit();
  }, [supabase, user?.id]);

  // 뒤로가기 버튼
  const handleBackClick = () => {
    router.push("/home");
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // 제출하기 버튼
  const handleSubmit = async () => {
    const { limit, resolution } = formData;

    const limitError = isValidMaxAmount(limit);
    const resolutionError = isVaildResolution(resolution);

    if (limitError || resolutionError) {
      setFormErrors({
        limit: limitError || "",
        resolution: resolutionError || "",
      });
      return;
    }
    setFormErrors({
      limit: "",
      resolution: "",
    });

    if (isEdit) {
      const { error } = await supabase
        .from("MonthlyLimit")
        .update({
          limit,
          resolution,
          user_id: user?.id,
        })
        .eq("user_id", user?.id);

      if (error) {
        console.error("데이터 업로드 실패", error);
        return;
      }
      console.log("데이터 업로드 성공", formData);
      router.push("./home");
    } else {
      const { error } = await supabase.from("MonthlyLimit").insert({
        limit,
        resolution,
        user_id: user?.id,
      });

      if (error) {
        console.error("데이터 업로드 실패", error);
        return;
      }
      console.log("데이터 업로드 성공", formData);
      router.push("./home");
    }
  };

  // 이번 달
  const date = new Date();
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  return (
    <div className="text-text flex flex-col px-9 pt-[8vh] pb-[12vh] font-bold">
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleBackClick}
      >
        <SVGIcon name="back" size={25}></SVGIcon>
      </button>
      <div className="flex flex-col items-center gap-15">
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">{formattedDate}</div>
          <h1 className="text-2xl">이달의 목표 🎯 </h1>
        </div>

        {/* 최대 음주 가능 횟수 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="max-w-44 text-center text-lg">
            이번 달에 마실 수 있는 최대 횟수를 알려주세요!
          </div>
          <div className="flex flex-row items-center gap-2">
            <DrinkInput
              type="number"
              onChange={(e) => handleChange("limit", e.target.value)}
              value={formData.limit}
            />
            회
          </div>
          {formErrors.limit && (
            <span className="mt-1 text-base font-normal text-red-500">
              {formErrors.limit}
            </span>
          )}
        </div>

        {/* 이달의 다짐 */}
        <div className="mb-20 flex flex-col items-center gap-2.5">
          <div className="text-center text-lg">
            이번 달 다짐을 한 줄로 적어볼까요?
          </div>
          <DrinkInput
            type="text"
            onChange={(e) => handleChange("resolution", e.target.value)}
            value={formData.resolution}
          />
          {formErrors.resolution && (
            <span className="mt-1 text-base font-normal text-red-500">
              {formErrors.resolution}
            </span>
          )}
        </div>
        {isEdit ? (
          <Button size="m" onClick={handleSubmit}>
            목표 수정
          </Button>
        ) : (
          <Button size="m" onClick={handleSubmit}>
            목표 등록
          </Button>
        )}
      </div>
    </div>
  );
}
