import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import GetProjects from "../../../api/project-backend/getProjects";
import SDGs from "../projects/variables/sdg.json"
import { useAuth } from "provider/AuthProvider";


import { BsChatLeftText } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

import ForumCard from "../forum/components/DiscussionCard";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import GetAllForums from "../../../api/forum/getAllForums";
import PostNewForum from "../../../api/forum/postNewForum";
import { getAuth } from "firebase/auth";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const sdgCategories = SDGs;

export default function MainForumPage () {

    const { user } = useAuth();
    console.log("user", user);
    const auth = getAuth();

    const [newForum, setNewForum] = useState({
        title: "",
        content: "",
        dateTime: "",
        category: "",
        creator: user ? (user.uid !== null ? user.uid : "Unknown User") : "Unknown User"
    });

    const [currentForumData, setCurrentForumData] = useState(null); 
    const [sdgFilter, setSdgFilter] = useState(""); // State to store the SDG filter
    const [sdgCategories, setSdgCategories] = useState(SDGs);


    async function getApiResponse () {
        try {
            const response = await GetAllForums();
            if (response.status == "Success" || response.status == 200) {
                console.log("Correct Response", response.data);
                setCurrentForumData(response.data);
                // setSdgCategories(SDGs);
            } else if (response.message == "No forums found.") {
                console.log("No forums found.");
                setCurrentForumData([]);
            }
            console.log("response", response);
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(() => {
        //fetch the api in a try catch block
        // const getApiResponse = async () => {
        //     try {
        //         const response = await GetAllForums();
        //         if (response.status == "Success" || response.status == 200) {
        //             console.log("Correct Response", response.data);
        //             setCurrentForumData(response.data);
        //             // setSdgCategories(SDGs);
        //         } else if (response.message == "No forums found.") {
        //             console.log("No forums found.");
        //             setCurrentForumData([]);
        //         }
        //         console.log("response", response);
        //     } catch (error) {
        //         console.log("error", error);
        //     }
        // };

        getApiResponse();
    }, []);

    function handleSdgFilterClick(sdgNumber) {
        // console.log("sdgNumber", sdgNumber);
        setSdgFilter(sdgNumber);
    };


    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    function clickAddNewForumButton(){
        setOpen(true);
    }


    function handleUserInput(e, type, input) {
        e.preventDefault();
        // console.log("type:", type, "input:", input);
        setNewForum({ ...newForum, [type]: input });
    }

    async function handleCreateNewForum() {
        console.log("newForum:", newForum);
    
        // store the current date and time in the newForum object
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes();
        const dateAndTime = date + ' ' + time;
    
        // Update the newForum state with the dateTime using functional form of setNewForum
        setNewForum(prevNewForum => ({ ...prevNewForum, dateTime: dateAndTime }));
        console.log("dateTime", dateAndTime);
    
        try {
            // Post the updated newForum state
            const response = await PostNewForum({ ...newForum, dateTime: dateAndTime });
            console.log("response", response);
        } catch (error) {
            console.log("error", error);
        }
    
        setOpen(false);
        // window.location.reload();
        getApiResponse();
    }

    if (currentForumData == null || sdgCategories == null) {
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
            <>
                <div className="mt-3 grid h-full grid-cols-1 gap-12 xl:grid-cols-2 2xl:grid-cols-3">
                    <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 pl-4">
                        {/* NFt Header */}
                        <div className="mb-4 mt-5 flex flex-col justify-between px-[8px] md:flex-row md:items-center">
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                All Forums
                            </h4>
                        </div>
    
                        {/* NFTs trending card */}
                        <div className="z-20 flex flex-col gap-y-9">
                            {currentForumData.length == 0 ? 
                                (
                                    <p>No comments found for this forum.</p>
                                ) 
                                : 
                                (
                                    <>
                                        {currentForumData.map((forum, key) => (
                                            console.log("forum123", forum.forumData),
                                            <div key={key} className={`w-full h-full ${sdgFilter == "" ? "block" : forum.forumData.category != sdgFilter ? "hidden" : "block"}`}>
                                                <ForumCard
                                                    title={forum.forumData.title}
                                                    content={forum.forumData.content}
                                                    creator={forum.forumData.creator}
                                                    comments={forum.forumData.comments}
                                                    category={forum.forumData.category}
                                                    id={forum.id}
                                                />
                                            </div>
                                                
                                            ))}   
                                    </>
                                )
                            }

                        </div>
                    </div>
    
                    {/* right side section */}
    
                    <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
                        <div className="mb-2 mt-5 flex flex-col justify-between md:items-center border-b border-black/05 w-full">
                            <button className="w-full flex items-center justify-center bg-blueSecondary text-white rounded-md p-2 ml-[16px]"
                            onClick={clickAddNewForumButton}>
                                Start New Forum
                            </button>
    
                            <div className="flex w-full flex-col gap-y-1 my-5 items-start">
                                <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1 ml-2 hover:bg-gray-100 py-2.5 px-3.5 rounded-md">
                                    <span>
                                        <BsChatLeftText />
                                    </span>
                                    <span className="font-bold text-navy-700 dark:text-white">
                                        All Forums
                                    </span>
                                </button>
                            </div>
                        </div>
    
                        <div className="mb-4 flex flex-col justify-between pl-[2px] md:items-center">
                            <div className="flex w-full flex-col gap-y-1 my-5 items-start">
                                {sdgCategories.map((category, key) => (
    
                                    <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1 whitespace-nowrap ml-2 hover:bg-gray-100 py-2.5 px-3.5 rounded-md" onClick={() => handleSdgFilterClick(category.number)}>
                                        <span>
                                            <div className={`w-3 rounded-full bg-sdg-${category.id} h-3`}/>
                                        </span>
                                        <span className="font-bold text-navy-700 dark:text-white ml-1 truncate">
                                            {category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl ">
                                <div className="w-full bg-white px-4 pb-4 pt-5 sm:p-7 sm:pb-4 ">
                                    <div className="w-full">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-black">
                                        Create New Forum
                                        </Dialog.Title>
                                        <div className="mt-7 w-full">
                                            <form class="space-y-4 w-full" action="#">
                                            <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input type="text" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Add Forum Title" required onChange={(e) => handleUserInput(e, "title", e.target.value)}/>
                                            </div>
    
                                            <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                <Menu as="div" className="relative w-full inline-block text-left">
                                                    <div>
                                                    <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                        {newForum.category === "" ? "Select Category" : newForum.category}
                                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </Menu.Button>
                                                    </div>
    
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                    <Menu.Items className="absolute right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[10rem] overflow-y-auto">
                                                        <div className="">
                                                        {sdgCategories.map((sdg, key) => (
                                                            <Menu.Item key={key}>
                                                            {({ active }) => (
                                                                <button
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm w-full text-left'
                                                                    )}
                                                                    onClick={(e) => handleUserInput(e, "category", sdg.number)}
                                                                >
                                                                    {sdg.name}
                                                                </button>
                                                            )}
                                                            </Menu.Item>
                                                        ))}
                                                        </div>
                                                    </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
    
                                            <div className="mb-10">
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea rows="4" type="text" placeholder="Add Forum Content" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(e) => handleUserInput(e, "content", e.target.value)}/>
                                            </div>
                                            
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-7">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-300 sm:ml-3 sm:w-auto"
                                        onClick={handleCreateNewForum}
                                    >
                                    Create
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={handleCreateNewForum}
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


