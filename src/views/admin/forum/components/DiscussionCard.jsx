
import { AiOutlineMessage } from "react-icons/ai";
import { useState, useEffect } from "react";
import Card from "components/card";
import { Link } from 'react-router-dom';
import SDGs from "../variables/sdg.json";
import GetCommentDataById from "../../../../api/forum/getCommentsByProjectId";
import GetRepliesById from "../../../../api/forum/getRepliesByProjectId";

const ForumCard = ({ title, content, creator, comments, category, id, extra }) => {
    //const [heart, setHeart] = useState(true);
    const [commentNo, setCommentNo] = useState(0);
    const [replyNo, setReplyNo] = useState(0);

    function storeForumId() {
        localStorage.setItem("forumId", id);
    }

    useEffect(() => {

        //const forumId = localStorage.getItem("forumId");
        //fetch the api in a try catch block
        const fetchData = async () => {
            try {
                const response = await GetCommentDataById(id);
                if (response.status == "Success") {
                    setCommentNo(response.data.length);
                } else if (response.message == "No comments found for the provided forumId.") {
                    console.log("No replies found for the provided forumId.");
                    setCommentNo(0);
                }
                console.log("response123", response.data);
            } catch (error) {
                console.log("error", error);
            }
        };

        const fetchData2 = async () => {
            try {
                // const response = await fetch(`http://localhost:3010/getProject/${projectId}`);
                const response = await GetRepliesById(id);
                if (response.status == "Success") {
                    setReplyNo(response.data.length);
                } else if (response.message == "No replies found for the provided forumId.") {
                    console.log("No replies found for the provided forumId.");
                    setReplyNo(0);
                }
                console.log("response", response);
            } catch (error) {
                console.log("error", error);
            }
        };

        if (id) {
            console.log("forumId", id);
            fetchData();
            fetchData2();
        }
        
    }, []);



    // write a function to get the sdg id from the SDG json file
    function getSDG(sdg) {
        // split the sdg string "SDG 1" to get the number
        const sdgNumber = sdg.split(" ")[1]
        return SDGs.filter((sdg) => sdg.id == parseInt(sdgNumber))[0].id
    }
    
    return (

        <Link 
            to={{
                pathname: `/admin/forum/${id}`
            }}

        >
            <button onClick={storeForumId} className="w-full">


                <Card extra={`flex flex-col w-full max-w-full h-full !p-5 3xl:p-![18px] bg-white relative ${extra}`}>
                    
                    <div className={`absolute -top-3.5 right-6 rounded-lg py-1 px-8 bg-sdg-${getSDG(category)} text-white text-sm font-semibold border border-black z-10`}>
                        {category}
                    </div>
                    
                    <div className="w-full flex flex-row justify-start gap-x-6 h-[8rem]">
                        
                        <div className="flex px-3 flex-col items-start justify-start w-full">
                            <div className="flex flex-row justify-between w-full items-end mb-4">
                                <div className="max-w-[75%] flex flex-col items-start text-left">
                                    <p className="w-full text-xl font-bold text-navy-700 dark:text-white truncate">
                                        {title}{" "}
                                    </p>
                                    <p className="w-full text-sm font-medium text-gray-600">
                                        By {creator}{" "} Insert name here
                                    </p>
                                </div>
                                
                                <div className="flex flex-row gap-x-3 items-center justify-end mb-3 hover:cursor-not-allowed">
                                    {/* <button
                                        onClick={() => setHeart(!heart)}
                                        className="relative flex items-center justify-center bg-white text-brand-500 hover:cursor-not-allowed"
                                    >
                                        <div className="flex flex-row items-center gap-x-1">
                                            <AiOutlineLike className="w-6 h-auto text-black"/>
                                            
                                            <p className="text-base font-semibold whitespace-nowrap text-black dark:text-white">{likes}</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setHeart(!heart)}
                                        className="relative flex items-center justify-center bg-white text-brand-500 hover:cursor-not-allowed"
                                    >
                                        <div className="flex flex-row items-center gap-x-1">
                                            
                                            <AiOutlineDislike className="w-6 h-auto text-black"/>
                                            
                                            <p className="text-base font-semibold whitespace-nowrap text-black dark:text-white">{dislikes}</p>
                                        </div>
                                    </button> */}

                                    <div className="flex items-center justify-center flex-row hover:cursor-not-allowed ">
                                        <div className="flex flex-row gap-x-1 mb-1">
                                            <span>
                                                <AiOutlineMessage className="w-5 h-auto text-black" />
                                            </span>
                                            <p className="text-sm font-semibold whitespace-nowrap text-black dark:text-white line-clamp-3">
                                                {commentNo + replyNo} comments
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

export default ForumCard;
