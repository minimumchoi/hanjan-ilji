import Button from "@/components/Button";
import Roulette from "@/components/Roulette";
import { ruletFood } from "@/data/food";
// import { createClient } from "@/utils/supabase/server-props";
// import type { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const RecommendTab = dynamic(() => import("@/components/RecommendTab"));
const RouletteModal = dynamic(() => import("@/components/RouletteModal"), {
  ssr: false,
});

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const supabase = createClient(context);

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

export default function Food() {
  const [shouldSpin, setShouldSpin] = useState(false);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpinClick = () => {
    if (shouldSpin) return;
    setShouldSpin(true);
  };

  const handleSpinEnd = () => {
    const index = Math.floor(Math.random() * ruletFood.length);
    setRandomIndex(index);
  };

  const handleReset = () => {
    setIsModalOpen(false);
    setShouldSpin(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (randomIndex !== null) {
      setIsModalOpen(true);
    }
  }, [randomIndex]);

  return (
    <div className="text-text relative flex flex-col items-center gap-9 pb-10">
      <div className="mt-24 flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold">오늘 뭐 먹지?</h2>
        <span className="text-sm">다양한 안주를 랜덤으로 추천해드려요 🎲</span>
      </div>

      <Roulette
        shouldSpin={shouldSpin}
        onSpinEnd={() => {
          setShouldSpin(false);
          handleSpinEnd();
        }}
      />

      <Button size="s" color="primary" onClick={handleSpinClick}>
        룰렛돌리기
      </Button>

      {isModalOpen && randomIndex !== null && (
        <div className="absolute inset-0 z-10 flex items-start justify-center bg-black/40 pt-50">
          <RouletteModal
            img={ruletFood[randomIndex].image}
            food={ruletFood[randomIndex].name}
            description={ruletFood[randomIndex].description}
            resetClick={handleReset}
            closeClick={handleClose}
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <h2 className="mt-10 text-2xl font-bold">주종별 페어링</h2>
        <span className="text-sm">어울리는 페어링 조합은 무엇이 있을까요?</span>
      </div>

      <RecommendTab />
    </div>
  );
}
