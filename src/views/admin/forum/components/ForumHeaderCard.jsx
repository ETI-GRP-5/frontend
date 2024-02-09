import { FaUser } from "react-icons/fa";
import { Fragment, useEffect, useRef, useState } from 'react';
import GetForumDataById from "../../../../api/forum/getForumDataById";
import PostNewComment from "../../../../api/forum/postNewComment";
import SDGs from "../variables/sdg.json";
import { getAuth } from "firebase/auth";
import { useAuth } from "provider/AuthProvider";
import GetUserDataById from "../../../../api/auth/getUserDetails";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function ForumHeaderCard ({id}) {

    const { user } = useAuth();
    const auth = getAuth();

    const [forum, setForum] = useState(null);
    const [username, setUsername] = useState("");
    const [newComment, setNewComment] = useState({
        content: "",
        forumId: id,
        dateTime: null,
        creator: user ? (user.uid !== null ? user.uid : "Unknown User") : "Unknown User"
    });

    async function fetchData () {
        try {
            // const response = await fetch(`http://localhost:3010/getProject/${projectId}`);
            const response = await GetForumDataById(id);
            if (response.status == "Success") {
                setForum(response.data.forumData);
            }
            console.log("response", response);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {

        //const forumId = localStorage.getItem("forumId");
        //fetch the api in a try catch block
        // const fetchData = async () => {
        //     try {
        //         // const response = await fetch(`http://localhost:3010/getProject/${projectId}`);
        //         const response = await GetForumDataById(id);
        //         if (response.status == "Success") {
        //             setForum(response.data.forumData);
        //         }
        //         console.log("response", response);
        //     } catch (error) {
        //         console.log("error", error);
        //     }
        // };

        if (id) {
            // console.log("forumId", id);
            fetchData();
        }
        
    }, []);

    useEffect(() => {
        async function fetchUsername() {
            try {
                const response = await GetUserDataById(forum?.creator);
                if (response.status === "Success") {
                    setUsername(response.data.name);
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchUsername();
    }, [forum?.creator]);

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

    // write a function to get the sdg id from the SDG json file
    function getSDG(sdg) {
        // split the sdg string "SDG 1" to get the number
        const sdgNumber = sdg.split(" ")[1]
        return SDGs.filter((sdg) => sdg.id == parseInt(sdgNumber))[0].id
    }

    function getSDGName(sdg){
        const sdgNumber = sdg.split(" ")[1]
        return SDGs.filter((sdg) => sdg.id == parseInt(sdgNumber))[0].name
    }


    function handleUserInput(e, type, content){
        e.preventDefault();
        setNewComment({ ...newComment, [type]: content });
        console.log("newComment", newComment);
    }


    async function handleCreateNewComment() {
        console.log("newForum:", newComment);

        // store the current date and time in the newForum object
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes();
        const dateAndTime = date+' '+time;
        //setNewComment({ ...newComment, dateTime: dateAndTime });
        console.log("dateTime", dateAndTime)
        
        try {
            const response = await PostNewComment({ ...newComment, dateTime: dateAndTime});
            console.log("response", response);
            fetchData();
            setNewComment({ ...newComment, content: "" }); 
        } catch (error) {
            console.log("error", error);
        }
        //window.location.reload();
        
    }



    if (forum == null) {
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
        );
    } else {


        return (
            <div className="flex w-full flex-col rounded-md bg-cover px-2 py-2 bg-white">
                <div className={`text-white linear rounded-full bg-sdg-${getSDG(forum.category)} px-4 py-1 text-center text-base font-medium w-fit`}>
                    {forum.category}: {getSDGName(forum.category)}
                </div>


                <div className="w-full mt-2">
                    <h4 className="mb-[14px] max-w-full text-xl font-bold text-black md:text-3xl md:leading-[38px]">
                    {forum.title}
                    </h4>
                </div>



                <div className="w-full flex items-start gap-3 mt-8">
                    <div className="min-w-fit flex h-10 w-10 items-center justify-center border border-black rounded-full p-1.5">
                        <FaUser
                            className="h-full w-full rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-4 items-end">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white leading-none">
                            {forum.creator == user.uid ? "You" : username || forum.creator}
                            </h5>
                            <p className="text-xs font-medium text-gray-300 leading-none">
                            {calculateTimeDifference(forum.dateTime)}
                            </p>
                        </div>
                        
                        <p className="mt-1 text-sm font-normal text-black">
                            {forum.content}
                        </p>
                    </div>
                </div>



                <div className="w-full flex items-start gap-3 mt-8">
                    <div className="min-w-fit flex h-10 w-10 items-center justify-center border border-black rounded-full p-1.5">
                        <FaUser
                            className="h-full w-full rounded-full"
                        />
                    </div>
                        <div className="flex flex-col w-full gap-2">
                        <textarea 
                            id="message" 
                            rows="3" 
                            class="block p-3 w-full text-sm text-black font-medium bg-gray-50 rounded-lg border border-gray-300" 
                            placeholder="Type here to reply..."
                            value={newComment.content}
                            onChange={(e) => handleUserInput(e, "content", e.target.value)}
                        ></textarea>

                        <button class="w-fit mt-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blueSecondary rounded-lg hover:bg-brandLinear" onClick={handleCreateNewComment}>
                            Post Comment
                        </button>
                    </div>
                </div>

            </div>
        );
    }
};

