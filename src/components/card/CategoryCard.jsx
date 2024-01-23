import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";

const NftCard = ({ title, color, alt, extra }) => {
  return (
    <Card
      extra={`flex flex-col w-full h-full bg-white ${extra}`}
    >
      <button className="h-full w-full transition duration-200">
        <div className="relative w-full">
          <div className={`h-[7rem] max-w-full min-w-[15rem] rounded-md ${color} `}/>
        </div>

        <div className="absolute bottom-3 left-1 flex items-center justify-between px-5 md:flex-col md:items-start w-full">

            <p className="text-xs font-semibold text-white dark:text-white max-w-full relative">
              {alt}{" "}:
            </p>
            <p className="text-lg font-bold text-white dark:text-white truncate max-w-full relative">
              {title}{" "}
            </p>
            
        </div>

      </button>
    </Card>
  );
};

export default NftCard;
