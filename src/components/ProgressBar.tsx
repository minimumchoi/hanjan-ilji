type ProgressBarProp = {
  max: number;
  value: number;
};

export default function ProgressBar({ max, value }: ProgressBarProp) {
  return (
    <div className="flex w-full justify-center py-3">
      <progress
        max={max}
        value={value}
        className="[&::-webkit-progress-value]:bg-primary h-3 w-70 rounded-xl [&::-webkit-progress-bar]:rounded-xl [&::-webkit-progress-bar]:bg-purple-100 [&::-webkit-progress-value]:rounded-xl"
      />
    </div>
  );
}
