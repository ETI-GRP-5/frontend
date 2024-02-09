import React from "react";
import { FaUser } from "react-icons/fa";
import Card from "components/card";
import { Fragment, useRef, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useAuth  } from "provider/AuthProvider";
import GetUserDataById from "../../../../api/auth/getUserDetails";

export default function ReplyCard ({content, creator, dateTime}) {

    const { user } = useAuth();
    const auth = getAuth();
    const [username, setUsername] = useState("");


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


    useEffect(() => {
        async function fetchUsername() {
          try {
            const response = await GetUserDataById(creator);
            if (response.status === "Success") {
              setUsername(response.data.name);
            }
          } catch (error) {
            console.log(error);
          }
        }
        
        fetchUsername();
    }, [creator]);

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
                        {creator == user.uid ? "You" : username || creator} {" "} 
                        <span className=" ml-1.5 font-normal text-black whitespace-normal">
                            {content}
                        </span>
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <p class="text-xs font-medium text-gray-300 leading-none">
                        {calculateTimeDifference(dateTime)}
                    </p>
                </div>
            </div>
        </div>
    );
};


