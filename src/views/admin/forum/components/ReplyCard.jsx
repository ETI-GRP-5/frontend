import React from "react";
import { FaUser } from "react-icons/fa";
import Card from "components/card";

export default function ReplyCard ({title, owner, price, time, extra}) {

    return (
        <div class="mb-3 ms-2 relative">
            <span class="absolute z-15 flex items-center justify-center -left-7 ring-6 ring-white dark:ring-gray-900 min-w-fit h-8 w-8 bg-white border border-black rounded-full p-[0.3rem]">
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
                    <p class="text-xs font-medium text-gray-300 leading-none">
                        {time} ago
                    </p>
                </div>
            </div>
        </div>
    );
};


