type ProgressBarProp = {
  max: number;
  value: number;
};

export default function ProgressBar({ max, value }: ProgressBarProp) {
  const percent = (value / max) * 100;

  return (
    <div
      className="w-full py-3"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="h-3 w-full overflow-hidden rounded-xl bg-purple-100">
        <div
          className="bg-primary h-full rounded-xl transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
