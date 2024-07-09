import React from 'react';

interface RequestCardProps {
  name: string;
  percentage: number;
  count: number;
}

const RequestCard: React.FC<RequestCardProps> = ({
  name,
  percentage,
  count,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-white shadow-lg shadow-[#00000030]  rounded-xl">
      <h3 className="font-semibold text-[14px]">{name}</h3>
      <h2 className="font-bold text-[32px] text-[#ff9900] ml-3">
        {percentage}%
      </h2>
      <h4 className="font-light text-[12px]">({count})</h4>
    </div>
  );
};

export default RequestCard;
