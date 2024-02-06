import React from "react";
import { FaUser } from "react-icons/fa";
import ReplyCard from "../components/ReplyCard";

import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FaReply } from "react-icons/fa";
import PostNewReply from "../../../../api/forum/postNewReply";
import GetRepliesById from "../../../../api/forum/getRepliesByProjectId";
import { getAuth } from "firebase/auth";

export default function CommentCard ({commentId, content, creator, dateTime, forumId}) {

    const auth = getAuth();

    const [reply, setReply] = useState(null);
    const [newReply, setNewReply] = useState({
        content: "",
        commentId: commentId,
        dateTime: null,
        creator: auth.currentUser ? (auth.currentUser.email !== null ? auth.currentUser.email : "Unknown User") : "Unknown User",
        forumId: forumId
    });
    
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    useEffect(() => {

        //const forumId = localStorage.getItem("forumId");
        //fetch the api in a try catch block
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:3010/getProject/${projectId}`);
                const response = await GetRepliesById(forumId);
                if (response.status == "Success") {
                    setReply(response.data);
                } else if (response.message == "No replies found for the provided forumId.") {
                    console.log("No replies found for the provided forumId.");
                    setReply([]);
                }
                console.log("response", response);
            } catch (error) {
                console.log("error", error);
            }
        };

        if (forumId) {
            console.log("forumId", forumId);
            fetchData();
        }
        
    }, []);


    function handleReplyButtonClick() {
        setOpen(true)
    }

    function calculateTimeDifference (dateTime) {
        const currentTime = new Date();
        const givenTime = new Date(dateTime);
        const timeDifference = Math.abs(currentTime - givenTime);
        const secondsDifference = Math.floor(timeDifference / 1000);
        
        if (secondsDifference < 3600) {
            // Less than an hour
            return Math.floor(secondsDifference / 60) + " minutes ago";
        } else if (secondsDifference < 86400) {
            // Less than a day
            return Math.floor(secondsDifference / 3600) + " hours ago";
        } else if (secondsDifference < 31536000) {
            // Less than a year
            return Math.floor(secondsDifference / 86400) + " days ago";
        } else {
            // More than a year
            return "More than a year ago";
        }
    };


    function handleUserInput(e, type, content){
        e.preventDefault();
        setNewReply({ ...newReply, [type]: content });
        console.log("newReply", newReply);
    }


    async function handleCreateNewReply() {
        console.log("newReply:", newReply);

        // store the current date and time in the newForum object
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes();
        const dateAndTime = date+' '+time;
        //setNewComment({ ...newComment, dateTime: dateAndTime });
        console.log("dateTime", dateAndTime)
        
        try {
            const response = await PostNewReply({ ...newReply, dateTime: dateAndTime});
            console.log("response", response);
        } catch (error) {
            console.log("error", error);
        }
        window.location.reload();
    }


    if (reply == null) {
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
            <>
                <div class="mb-4 ms-2 relative">
                    <span class="absolute z-15 flex items-center justify-center -left-6 ring-6 ring-white dark:ring-gray-900 min-w-fit h-8 w-8 bg-white border border-black rounded-full p-[0.3rem]">
                        <FaUser
                            className="h-full w-full rounded-full"
                        />
                    </span>
                    <div class="ml-5 p-0.5 bg-white">
                        <div class="items-center justify-start mb-1 flex gap-4">
                            <p className="text-sm font-extrabold text-black whitespace-nowrap">
                                {creator == auth.currentUser.email ? "You" : creator}HELLO {" "} 
                                <span className=" ml-1.5 font-normal text-black whitespace-normal">
                                    {content}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <button 
                                className="text-xs font-medium text-gray-300 leading-none"
                                onClick={handleReplyButtonClick}
                            >
                                Reply
                            </button>
                            <p class="text-xs font-medium text-gray-300 leading-none">
                                {calculateTimeDifference(dateTime)}
                            </p>
                        </div>

                        <div className="mt-5 ml-6">
                            {/* filter by commentId */}

                            {reply.length == 0 ? 
                                (
                                    <p>No replies found for this comment.</p>
                                ) 
                                : 
                                (
                                    <>
                                        {reply
                                            .filter((reply) => reply.replyData.commentId === commentId)
                                            .map((reply) => (
                                            <ReplyCard 
                                                key={reply.id}
                                                commentId={reply.replyData.commentId}
                                                content={reply.replyData.content} 
                                                creator={reply.replyData.creator}
                                                dateTime={reply.replyData.dateTime}
                                                forumId={forumId}
                                            />
                                        ))}
                                    </>
                                )
                            }

                                
                        </div>


                        
                    </div>
                </div>



                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-6 pb-5 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blueSecondary/20 sm:mx-0 sm:h-10 sm:w-10">
                                            <FaReply className="h-5 w-5 text-blueSecondary" aria-hidden="true" />
                                        </div>
                                        <div className="w-full mt-0 ml-4 text-left">
                                            <Dialog.Title as="h3" className="font-semibold leading-6 text-gray-900 text-lg">
                                                Reply to Pavel Kadysz
                                            </Dialog.Title>
                                            <div className="mt-3 w-full pr-3">
                                                <textarea 
                                                    id="reply-message" 
                                                    rows="5" 
                                                    class="block p-3 w-full text-sm text-black font-medium bg-gray-50 rounded-lg border border-gray-300" 
                                                    placeholder="Type here to reply to Pawel..."
                                                    onChange={(e) => handleUserInput(e, "content", e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-blueSecondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brandLinear sm:ml-3 sm:w-auto"
                                    onClick={handleCreateNewReply}
                                >
                                    Post Reply
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </>
            
        );
    }
};


