export const isValidDrinkType = (
  drinkType: string,
  customDrinkType: string,
) => {
  if (typeof drinkType !== "string" || drinkType.trim() === "") {
    return "마신 술 종류를 선택해주세요";
  }
  if (
    drinkType === "직접입력" &&
    (!customDrinkType || customDrinkType.trim() === "")
  ) {
    return "직접 입력한 술 이름이 비어 있어요";
  }
  return;
};

export const isValidAmount = (amount: string) => {
  if (typeof amount !== "string" || amount.trim() === "") {
    return "마신 양을 입력해주세요";
  }
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return "1 이상으로 입력해주세요";
  }
  return;
};

export const isValidWithWhom = (withWhom: string) => {
  if (typeof withWhom !== "string" || withWhom.trim() === "") {
    return "혼자 마셨다면 '혼자'라고 입력해 주세요";
  }
  return;
};

export const isValidFeeling = (feeling: string) => {
  if (typeof feeling !== "string" || feeling.trim() === "") {
    return "오늘의 기분을 선택해주세요";
  }
  return;
};

export const isValidMaxAmount = (limit: string) => {
  if (typeof limit !== "string" || limit.trim() === "") {
    return "최대 횟수를 입력해주세요";
  }
  const numericlLimit = Number(limit);
  if (isNaN(numericlLimit) || numericlLimit <= 0) {
    return "1 이상으로 입력해주세요";
  }
};

export const isValidResolution = (resolution: string) => {
  if (typeof resolution !== "string" || resolution.trim() === "") {
    return "짧게라도 남겨볼까요?";
  }
};
