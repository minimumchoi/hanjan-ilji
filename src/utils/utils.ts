export const splitText = (text: string): [string, string?] => {
  if (text.length <= 12) return [text];

  const middle = Math.floor(text.length / 2);
  let left = middle;
  let right = middle;

  while (left > 0 && text[left] !== " ") left--;
  while (right < text.length && text[right] !== " ") right++;

  let splitIndex = -1;
  if (text[left] === " ") {
    splitIndex =
      middle - left <= right - middle
        ? left
        : text[right] === " "
          ? right
          : left;
  } else if (text[right] === " ") {
    splitIndex = right;
  }

  if (splitIndex === -1) return [text];

  const firstLine = text.slice(0, splitIndex).trim();
  const secondLine = text.slice(splitIndex).trim();
  return [firstLine, secondLine];
};
