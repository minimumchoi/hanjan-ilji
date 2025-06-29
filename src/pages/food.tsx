import Button from "@/components/Button";
import RecommendTab from "@/components/RecommendTab";
import Roulette from "@/components/Roulette";
import RouletteModal from "@/components/RouletteModal";
import { ruletFood } from "@/data/food";
import { createClient } from "@/utils/supabase/server-props";
import type { GetServerSidePropsContext } from "next";
import { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const {
    data: { user },
    error: userFetchingError,
  } = await supabase.auth.getUser();

  if (userFetchingError || !user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Food() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [shouldSpin, setShouldSpin] = useState(false);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const handleSpinClick = () => {
    if (shouldSpin) return;
    setShouldSpin(true);
  };

  const handleSpinEnd = () => {
    const index = Math.floor(Math.random() * ruletFood.length);
    setRandomIndex(index);
  };

  const handleReset = () => {
    modalRef.current?.close();
    setShouldSpin(true);
  };

  useEffect(() => {
    if (randomIndex !== null && modalRef.current) {
      modalRef.current?.showModal();
    }
  }, [randomIndex]);

  return (
    <div className="text-text relative flex flex-col items-center gap-9">
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

      {randomIndex !== null && (
        <RouletteModal
          img={ruletFood[randomIndex].image}
          modalRef={modalRef}
          food={ruletFood[randomIndex].name}
          description={ruletFood[randomIndex].description}
          onClick={handleReset}
        />
      )}
      <div className="flex flex-col items-center gap-2">
        <h2 className="mt-10 text-2xl font-bold">주종별 페어링</h2>
        <span className="text-sm">어울리는 페어링 조합은 무엇이 있을까요?</span>
      </div>

      <RecommendTab />
    </div>
  );
}
