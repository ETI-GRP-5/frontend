import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { BsStar, BsStarFill } from "react-icons/bs";

const NftCard = ({ title, author, ppl, image, bidders, extra }) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-7 3xl:p-![20px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          
        </div>

        <div className="mb-7 flex items-center justify-between px-1 md:flex-col md:items-start">

          <div className="mb-2 flex flex-row items-center justify-between w-full">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <button
              onClick={() => setHeart(!heart)}
              className="flex items-center justify-center rounded-md bg-white text-brand-500 hover:cursor-pointer"
            >
              <div className="flex h-full w-full items-center justify-center rounded-md text-xl hover:bg-gray-50 dark:text-navy-900">
                {heart ? (
                  <BsStar className="w-6 h-auto"/>
                ) : (
                  <BsStarFill className="text-brand-500 w-6 h-auto" />
                )}
              </div>
            </button>
          </div>


          <div>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 text-balance line-clamp-5">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. {author}{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="px-1 text-sm font-bold text-brand-500 dark:text-white">
              Members: {ppl} <span>ppl</span>
            </p>
          </div>

          
          <button
            href=""
            className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            View
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
