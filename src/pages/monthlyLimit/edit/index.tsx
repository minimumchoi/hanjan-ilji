import Button from "@/components/Button";
import DrinkInput from "@/components/DrinkInput";
import { SVGIcon } from "@/components/SVGIcon";
import { createClient } from "@/utils/supabase/component";
import {
  isValidResolution,
  isValidMaxAmount,
} from "@/utils/todayDrinkValidaion";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { createClient as createServerClient } from "@/utils/supabase/server-props";
import type { User } from "@supabase/supabase-js";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerClient(context);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("MonthlyLimit")
    .select("*")
    .eq("user_id", user?.id)
    .eq("year", currentYear)
    .eq("month", currentMonth)
    .single();

  if (error?.details === "The result contains 0 rows" || !data) {
    return {
      props: {
        limit: "",
        resolution: "",
        isEdit: false,
        user: user,
      },
    };
  }

  return {
    props: {
      limit: data.limit ?? "",
      resolution: data.resolution ?? "",
      isEdit: true,
      user: user,
    },
  };
}

type MonthlyLimitProp = {
  limit: number | string;
  resolution: string;
  isEdit: boolean;
  user: User;
};

export default function MonthlyLimit({
  limit,
  resolution,
  isEdit,
  user,
}: MonthlyLimitProp) {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    limit: String(limit),
    resolution,
  });
  const [formErrors, setFormErrors] = useState({
    limit: "",
    resolution: "",
  });
  const [disabled, setDisabled] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async () => {
    const { limit, resolution } = formData;

    const limitError = isValidMaxAmount(limit);
    const resolutionError = isValidResolution(resolution);

    if (limitError || resolutionError) {
      setFormErrors({
        limit: limitError || "",
        resolution: resolutionError || "",
      });
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (isEdit) {
      const { error } = await supabase
        .from("MonthlyLimit")
        .update({
          limit,
          resolution,
        })
        .eq("user_id", user?.id)
        .eq("year", currentYear)
        .eq("month", currentMonth);
      setDisabled(true);

      if (error) {
        console.error("업데이트 실패", error);
        setDisabled(false);
        return;
      }
      router.back();
    } else {
      const { error } = await supabase.from("MonthlyLimit").insert({
        limit,
        resolution,
        user_id: user?.id,
        year: currentYear,
        month: currentMonth,
      });
      setDisabled(true);
      if (error) {
        console.error("등록 실패", error);
        setDisabled(false);
        return;
      }

      router.back();
    }
  };

  const date = new Date();
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  return (
    <div className="text-text flex flex-col px-9 pt-[8vh] pb-[12vh] font-bold">
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleBackClick}
      >
        <SVGIcon name="back" size={25} />
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

        <Button size="m" onClick={handleSubmit} disabled={disabled}>
          {isEdit ? "목표 수정" : "목표 등록"}
        </Button>
      </div>
    </div>
  );
}
