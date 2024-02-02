import React from "react";
import { FaUser } from "react-icons/fa";
import ReplyCard from "../components/ReplyCard";

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FaReply } from "react-icons/fa";

export default function CommentCard ({title, owner, price, time, extra}) {

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    function handleReplyButtonClick() {
        setOpen(true)
    }

    const ReplyData = [
        {
            reply_title: "Colorful Heaven",
            reply_owner: "Mark Benjamin",
            reply_price: 0.4,
            reply_time: "30s",
        },
        {
            reply_title: "Abstract Colors",
            reply_owner: "Esthera Jackson",
            reply_price: 2.4,
            reply_time: "50m",
        },
        {
            reply_title: "ETH AI Brain",
            reply_owner: "Nick Wilson",
            reply_price: 0.3,
            reply_time: "20s",
        },
        {
            reply_title: "Swipe Circles",
            reply_owner: " Peter Will",
            reply_price: 0.4,
            reply_time: "4h",
        },
        {
            reply_title: "Mesh Gradients",
            reply_owner: "Will Smith",
            reply_price: 0.4,
            reply_time: "30s",
        },
        {
            reply_title: "3D Cubes Art",
            reply_owner: " Manny Gates",
            reply_price: 0.4,
            reply_time: "2m",
        },
    ];

  
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
                            {title} {" "} 
                            <span className=" ml-1.5 font-normal text-black whitespace-normal">
                                Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.
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
                            3h ago
                        </p>
                    </div>

                    <div className="mt-5 ml-6">
                        {ReplyData.map((data, index) => (
                            <ReplyCard 
                                key={index}
                                title={data.reply_title} 
                                owner={data.reply_owner}
                                price={data.reply_price}
                                time={data.reply_time}
                            />
                        ))}    
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
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-blueSecondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brandLinear sm:ml-3 sm:w-auto"
                                onClick={() => setOpen(false)}
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
};


