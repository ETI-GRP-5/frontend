
import { AiOutlineMessage, AiFillMessage, AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { useState } from "react";
import Card from "components/card";
import { Link } from 'react-router-dom';

const NftCard = ({ title, content, creator, likes, dislikes, comments, sdg, id, extra }) => {
    const [heart, setHeart] = useState(true);

    function storeDiscussionId() {
        localStorage.setItem("discussionId", id);
    }
    
    return (

        <Link 
            to={{
                pathname: `/admin/forum/${id}`
            }}

        >
            <button onClick={storeDiscussionId}>


                <Card extra={`flex flex-col w-full h-full !p-5 3xl:p-![18px] bg-white relative ${extra}`}>
                    
                    <div className="absolute -top-3.5 right-6 rounded-lg py-1 px-8 bg-white text-blueSecondary text-sm font-semibold border border-black">
                        SDG {sdg}
                    </div>
                    
                    <div className="w-full flex flex-row justify-start gap-x-6 h-[8rem]">
                        
                        <div className="flex px-3 flex-col items-start justify-start">
                            <div className="flex flex-row justify-between w-full items-end mb-4">
                                <div className="flex flex-col items-start">
                                    <p className="text-xl font-bold text-navy-700 dark:text-white">
                                        {title}{" "}
                                    </p>
                                    <p className="text-sm font-medium text-gray-600">
                                        By {creator}{" "}
                                    </p>
                                </div>
                                
                                <div className="flex flex-row gap-x-3 items-center justify-end mb-3">
                                    <button
                                        onClick={() => setHeart(!heart)}
                                        className="relative flex items-center justify-center bg-white text-brand-500 hover:cursor-pointer"
                                    >
                                        <div className="flex flex-row items-center gap-x-1">
                                            {heart ? (
                                                    <AiOutlineLike className="w-6 h-auto text-black"/>
                                            ) : (
                                                    <AiFillLike className="text-brand-500 w-6 h-auto" />
                                            )}
                                            <p className="text-base font-semibold whitespace-nowrap text-black dark:text-white">{likes}</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setHeart(!heart)}
                                        className="relative flex items-center justify-center bg-white text-brand-500 hover:cursor-pointer"
                                    >
                                        <div className="flex flex-row items-center gap-x-1">
                                            {!heart ? (
                                                    <AiOutlineDislike className="w-6 h-auto text-black"/>
                                            ) : (
                                                    <AiFillDislike className="text-brand-500 w-6 h-auto" />
                                            )}
                                            <p className="text-base font-semibold whitespace-nowrap text-black dark:text-white">{dislikes}</p>
                                        </div>
                                    </button>

                                    <div className="flex items-center justify-center flex-row hover:cursor-not-allowed">
                                        <div className="flex flex-row gap-x-1">
                                            <span>
                                                <AiOutlineMessage className="w-6 h-auto text-brand-500" />
                                            </span>
                                            <p className="text-base font-semibold whitespace-nowrap text-black dark:text-white line-clamp-3">
                                                {comments}
                                            </p>
                                        </div>
                                    </div>
                                    

                                </div>
                            </div>

                            
                            <p className="w-full text-sm text-left font-medium text-gray-600 line-clamp-3">
                                {content}
                            </p>
                            
                        </div>


                    </div>
                </Card>
            </button>
        </Link>
    );
};

export default NftCard;
