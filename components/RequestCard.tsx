interface RequestCardProps {
  percentage: number;
  name: string;
  messageCount: number;
}

export default function RequestCard({
  percentage,
  name,
  messageCount,
}: RequestCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 shadow-lg shadow-[#00000030] bg-[#FFF9F0] rounded-xl">
      <h3 className="font-semibold text-[14px]">{name}</h3>
      <h2 className="font-bold text-[32px] text-[#ff9900] ml-3">
        {percentage}%
      </h2>
      <h4 className="font-light text-[12px]">({messageCount})</h4>
    </div>
  );
}
