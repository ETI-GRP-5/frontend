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


import { BsChatLeftText } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

import ForumCard from "../forum/components/DiscussionCard";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const sdgCategories = SDGs;

export default function MainForumPage () {

    const [newForum, setNewForum] = useState({
        title: "",
        content: "",
        like: 0,
        dislike: 0,
        dateTime: "",
        category: "",
    });

    const [currentForumData, setCurrentForumData] = useState([]); 
    const [sdgFilter, setSdgFilter] = useState(""); // State to store the SDG filter

    function handleSdgFilterClick(sdgNumber) {
        // console.log("sdgNumber", sdgNumber);
        setSdgFilter(sdgNumber);
    };


    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    function clickAddNewForumButton(){
        setOpen(true);
    }


    function handleUserInput(type, input) {
        // console.log("type:", type, "input:", input);
        setNewForum({ ...newForum, [type]: input });
    }

    async function handleCreateNewForum() {
        console.log("newForum:", newForum);

        // store the current date and time in the newForum object
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes();
        const dateTime = date+' '+time;
        setNewForum({ ...newForum, dateTime: dateTime });
        
        try {
            const response = await fetch("http://localhost:3011/postForum", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ forumData: newForum }), // Send data in the expected format
            });
            console.log("response", response);
        } catch (error) {
            console.log("error", error);
        }

        setOpen(false);
        window.location.reload();
    }


    return (
        <>
            <div className="mt-3 grid h-full grid-cols-1 gap-20 xl:grid-cols-2 2xl:grid-cols-3">
                <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 pl-4">
                    {/* NFt Header */}
                    <div className="mb-4 mt-5 flex flex-col justify-between px-[8px] md:flex-row md:items-center">
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                            All Forums
                        </h4>
                    </div>

                    {/* NFTs trending card */}
                    <div className="z-20 flex flex-col gap-y-9">
                        <ForumCard
                            title="ETH AI Brain"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc."
                            creator="Nick Wilson"
                            likes={200}
                            dislikes={50}
                            comments={7}
                            sdg="2"
                            id={2}
                        />
                        <ForumCard
                            title="ETH AI Brain"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc."
                            creator="Nick Wilson"
                            likes={200}
                            dislikes={50}
                            comments={7}
                            sdg="2"
                            id={2}
                        />
                        <ForumCard
                            title="ETH AI Brain"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc."
                            creator="Nick Wilson"
                            likes={200}
                            dislikes={50}
                            comments={7}
                            sdg="2"
                            id={2}
                        />
                        <ForumCard
                            title="ETH AI Brain"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc."
                            creator="Nick Wilson"
                            likes={200}
                            dislikes={50}
                            comments={7}
                            sdg="2"
                            id={2}
                        />
                        <ForumCard
                            title="ETH AI Brain"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc."
                            creator="Nick Wilson"
                            likes={200}
                            dislikes={50}
                            comments={7}
                            sdg="2"
                            id={2}
                        />
                        <ForumCard
                            title="ETH AI Brain"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc. Sed euismod, diam id bibendum ultricies, nunc elit ultricies nunc, vitae lacinia nisl nisl eget nunc."
                            creator="Nick Wilson"
                            likes={200}
                            dislikes={50}
                            comments={7}
                            sdg="2"
                            id={2}
                        />
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

                            <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1 ml-2 hover:bg-gray-100 py-2.5 px-3.5 rounded-md">
                                <span>
                                    <BsStar />
                                </span>
                                <span className="font-bold text-navy-700 dark:text-white">
                                    Liked Forums
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col justify-between pl-[2px] md:items-center">
                        <div className="flex w-full flex-col gap-y-1 my-5 items-start">
                            {sdgCategories.map((category, key) => (

                                <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1 whitespace-nowrap ml-2 hover:bg-gray-100 py-2.5 px-3.5 rounded-md">
                                    <span>
                                        <div className={`w-3 rounded-full ${category.colour} h-3`}/>
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
                                            <input type="text" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Add Forum Title" required onChange={(e) => handleUserInput("title", e.target.value)}/>
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
                                                                onClick={() => handleUserInput("category", sdg.number)}
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
                                            <textarea rows="4" type="text" placeholder="Add Forum Content" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(e) => handleUserInput("content", e.target.value)}/>
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


