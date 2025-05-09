import RuletModal from "@/components/RuletModal";
import { ruletFood } from "@/data/food";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

// 버튼 눌렀을때 룰렛에 애니메이션 먼저 적용

export default function RuletButton() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const handleClick = () => {
    const index = Math.floor(Math.random() * ruletFood.length) + 0;
    setRandomIndex(index);
  };

  const handleResetClick = () => {
    const index = Math.floor(Math.random() * ruletFood.length) + 0;
    setRandomIndex(index);
  };

  useEffect(() => {
    if (randomIndex !== null && modalRef.current) {
      modalRef.current?.showModal();
    }
  }, [randomIndex]);

  return (
    <>
      <Button size="s" color="primary" onClick={handleClick}>
        룰렛돌리기
      </Button>

      {randomIndex !== null && (
        <RuletModal
          img={"이미지 넣기"}
          modalRef={modalRef}
          food={ruletFood[randomIndex].name}
          description={ruletFood[randomIndex].description}
          onClick={handleResetClick}
        />
      )}
    </>
  );
}
