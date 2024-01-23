import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useState } from "react";
import Card from "components/card";

const NftCard = ({ title, author, price, image, bidders, extra }) => {
    const [heart, setHeart] = useState(true);
    return (
        <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
        >
            <div className="h-full w-full flex flex-row gap-x-6 max-h-[8rem]">
                <div className="flex min-w-fit min-h-fit mt-1 ml-1">
                    {/* <img
                        src={image}
                        className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full border border-black"
                        alt=""
                    /> */}

                    
                        <img
                            className="h-[3rem] w-[3rem] rounded-full object-cover"
                            src={image}
                            alt=""
                        />
                </div>

                

                <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between h-full overflow-hidden">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-navy-700 dark:text-white">
                            {" "}
                            {title}{" "}
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                            By {author}{" "}
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-600 md:mt-3 line-clamp-3">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-y-4 justify-start items-end">

                    {/* change to star */}
                    <div className="">
                        <button
                            onClick={() => setHeart(!heart)}
                            className="relative flex items-center justify-center rounded-full py-2 bg-white text-brand-500 hover:cursor-pointer"
                        >
                            <div className="flex h-full w-full items-center justify-end rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
                            {heart ? (
                                <div className="flex flex-row items-center gap-x-2">
                                    <BsStar className="w-5 h-auto"/>
                                    <p className="text-sm font-semibold whitespace-nowrap">Not Following</p>
                                </div>
                                
                                
                            ) : (
                                <div className="flex flex-row items-center gap-x-2">
                                    <BsStarFill className="text-brand-500 w-5 h-auto" />
                                    <p className="text-sm font-semibold whitespace-nowrap">Following</p>
                                </div>
                                
                            )}
                            </div>
                        </button>
                    </div>


                    <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
                        <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
                        +5
                        </span>
                        {bidders.map((avt, key) => (
                            <span
                                key={key}
                                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
                            >
                                <img
                                    className="h-full w-full rounded-full object-cover"
                                    src={avt}
                                    alt=""
                                />
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between whitespace-nowrap">
                        <div className="flex flex-row gap-x-1">
                            <span>
                                <AiOutlineMessage className="w-5 h-auto text-brand-500" />
                            </span>
                            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
                            {price} <span>Comments</span>
                            </p>
                        </div>
                    </div>
                </div>

                
            </div>
        </Card>
    );
};

export default NftCard;
