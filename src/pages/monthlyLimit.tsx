import Button from "@/components/Button";
import DrinkInput from "@/components/DrinkInput";
import { SVGIcon } from "@/components/SVGIcon";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MonthlyLimit() {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({ limit: "", resolution: "" });

  const handleBackClick = () => {
    router.push("/home");
  };
  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { limit, resolution } = formData;

    const {
      data: { user },
    } = await supabase.auth.getUser();

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
        <SVGIcon name="back" size={25}></SVGIcon>
      </button>
      <div className="flex flex-col items-center gap-15">
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-lg">{formattedDate}</div>
          <h1 className="text-2xl">이달의 목표 🎯 </h1>
        </div>
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
        </div>
        <div className="mb-20 flex flex-col items-center gap-2.5">
          <div className="text-center text-lg">
            이번 달 다짐을 한 줄로 적어볼까요?
          </div>
          <DrinkInput
            type="text"
            onChange={(e) => handleChange("resolution", e.target.value)}
            value={formData.resolution}
          />
        </div>
        <Button size="m" onClick={handleSubmit}>
          목표 등록
        </Button>
      </div>
    </div>
  );
}
