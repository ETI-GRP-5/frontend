import React from "react";
import { Fragment, useEffect, useRef, useState } from 'react';

import { FaUser } from "react-icons/fa";

import { FaEthereum } from "react-icons/fa";
import CommentCard from "../components/CommentCard"
import Card from "components/card";
import GetCommentDataById from "../../../../api/forum/getCommentsByProjectId";


const HistoryCard = ({id}) => {

    const [comment, setComment] = useState(null);


    useEffect(() => {

        //const forumId = localStorage.getItem("forumId");
        //fetch the api in a try catch block
        const fetchData = async () => {
            try {
                const response = await GetCommentDataById(id);
                if (response.status == "Success") {
                    setComment(response.data);
                } else if (response.message == "No comments found for the provided forumId.") {
                    console.log("No replies found for the provided forumId.");
                    setComment([]);
                }
                console.log("response123", response.data);
            } catch (error) {
                console.log("error", error);
            }
        };

        if (id) {
            console.log("forumId", id);
            fetchData();
        }
        
    }, []);

    function calculateTotalComments () {
        return comment.length;
    }

    if (comment == null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <Card extra={"mt-3 !z-5 overflow-hidden border-0"}>
                {/* HistoryCard Header */}
                <div className="flex items-center justify-between rounded-t-3xl py-3 px-5">
                    <div className="text-lg font-bold text-navy-700 dark:text-white">
                        {calculateTotalComments()} comments
                    </div>
                </div>
    
                {/* History CardData */}
                <div className="w-full h-full">
                    <div className="flex h-full w-full items-start justify-between bg-white px-9 py-[20px]">
                        <div class="relative border-s border-gray">

                            {comment.length == 0 ? 
                                (
                                    <p>No comments found for this forum.</p>
                                ) 
                                : 
                                (
                                    <>
                                        {comment.map((comment) => (
                                            <CommentCard 
                                                key={comment.id}
                                                commentId={comment.id}
                                                content={comment.commentData.content} 
                                                creator={comment.commentData.creator}
                                                dateTime={comment.commentData.dateTime}
                                                forumId={id}
                                            />
                                        ))}   
                                    </>
                                )
                            }


                                
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
    
};

export default HistoryCard;