import { RefObject } from "react";

export const drinkTypes = ["소주", "맥주", "막걸리", "위스키", "와인"];

export const drinkUnitTypes = ["잔", "병"];

export const feelingTypes = [
  "매우좋았어요",
  "그냥그랬어요",
  "스트레스를 받았어요",
  "조금 우울했어요",
];

export type DrinkTypes = (typeof drinkTypes)[number];

export type DrinkUnitTypes = (typeof drinkUnitTypes)[number];

export type FeelingTypes = (typeof feelingTypes)[number];

export type ModalListProp = {
  flex?: "col" | "row";
  name: string;
  value: string | number;
  unit?: DrinkUnitTypes;
};

export type DrinkData = {
  feeling: string;
  drink: string;
  amount: number;
  unit: string;
  id: string;
  whom: string;
};

export type DetailedModalProp = {
  drinkData: DrinkData;
  onClose: () => void;
};
