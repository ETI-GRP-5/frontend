import Card from "components/card";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import GetProjectDataById from "../../../../api/project/getProjectDataById";
import SDGs from "../variables/sdg.json"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProjectDescriptionCard (props) {
    const sdgCategories = SDGs;
    const [project, setProject] = useState(null);

    useEffect(() => {

        const projectId = localStorage.getItem("projectId");
        //fetch the api in a try catch block
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://localhost:3010/getProject/${projectId}`);
                const response = await GetProjectDataById(projectId);
                if (response.status == "Success") {
                    setProject(response.data.projectData);
                }
                console.log("response", response);
                //const json = await response.json();
                // sortSdg(json);
                // setSdg(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        if (projectId) {
            console.log("projectId", projectId);
            fetchData();
        }
        
    }, []);

    function findSDGName(sdg) {
        for (let i = 0; i < sdgCategories.length; i++) {
            if (sdgCategories[i].number == sdg) {
                return sdgCategories[i].name;
            }
        }
    }

    function findSDGColour(sdg) {
        for (let i = 0; i < sdgCategories.length; i++) {
            if (sdgCategories[i].number == sdg) {
                return sdgCategories[i].colour;
            }
        }
    }

    function handleUserInput(key, value) {
        setProject((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    // write a function to get the sdg id from the SDG json file
    function getSDG(sdg) {
        // split the sdg string "SDG 1" to get the number
        const sdgNumber = sdg.split(" ")[1]
        return SDGs.filter((sdg) => sdg.id == parseInt(sdgNumber))[0].id
    }

  
    if (!project) {
        return <div>Loading...</div>;
    }
    else {
        console.log("project", project);
        const imageURL = require(`../../../../assets/img/sdg-icons/${project.category}.png`);
        const backgroundColour = findSDGColour(project.category);
        return (
            <Card extra={"mt-3 z-0 overflow-hidden"}>
                {/* Project Description Card */}
                <div className="z-20 grid grid-cols-1 divide-x-[1px] divide-black md:grid-cols-3 bg-white rounded-md border border-black">
    
                    {/* Left Side */}
                    <div className="w-full h-full bg-transparent p-8 flex flex-col justify-between items-center gap-4"> 
    
                        {/* SDG Display Component */}
                        <div className={`relative w-full flex items-center justify-center bg-sdg-${getSDG(project.category)} h-[10rem] rounded-md border border-black overflow-hidden`}>
                            <img src={imageURL} alt="sdg icon" className="w-[150px] h-auto mt-5"/>
                            {/* <div className="rounded-md bg-blueSecondary  w-full h-[10rem]" /> */}
                        </div>
                        {/* Creator Information Component */}
                        <div className="flex flex-row gap-5 items-center">
                            <p className="text-md font-medium text-gray-600 ">
                                By {" "}
                            </p>
                            <p className="text-lg font-bold text-black dark:text-white">
                                {project.creator}{" "}
                            </p>
                        </div>
                        {/* Basic Project Information Component */}
                        <div className="w-full flex flex-row divide-x-2 divide-black items-center justify-between">
                            <div className="flex flex-col items-center justify-center w-full">
                                <p className="text-2xl font-bold text-black dark:text-white">
                                    90
                                </p>
                                <p className="text-md font-medium text-navy-700 dark:text-white">
                                    member(s)
                                </p>
                                </div>
                                <div className="flex flex-col items-center justify-center w-full">
                                <p className="text-2xl font-bold text-black dark:text-white">
                                    90
                                </p>
                                <p className="text-md font-medium text-navy-700 dark:text-white">
                                    task(s)
                                </p>
                                </div>
                                <div className="flex flex-col items-center justify-center w-full">
                                <p className="text-2xl font-bold text-black dark:text-white">
                                    90
                                </p>
                                <p className="text-md font-medium text-navy-700 dark:text-white">
                                    resource(s)
                                </p>
                            </div>
                        </div>
                        {/* Join/Leave Project Button Component */}
                        <div className="flex items-center justify-between flex-col w-full">
                            <button
                                href=""
                                className="linear w-full rounded-md bg-blueSecondary px-7 py-2 text-base font-medium text-white transition duration-200 hover:bg-brandLinear active:bg-brand-700 border border-black"
                            >
                                Join Project
                            </button>
                        </div>
                    </div>
    
    
    
    
    
                    {/* Right Side */}
                    <div className="w-full h-full bg-transparent py-8 px-6 flex flex-col items-center justify-between col-span-2 gap-6"> 
    
                        {/* Project Title Component */}
                        <div className="w-full flex flex-col items-start justify-between gap-0">
                            <p className="text-xs font-medium text-gray-600">
                                TITLE
                            </p>
                            <p className="text-2xl font-bold text-black dark:text-white">
                                {project.name}{" "}
                            </p>
                        </div>
                        {/* Project Description Component */}
                        <div className="w-full flex flex-col items-start justify-between gap-0">
                            <p className=" text-xs font-medium text-gray-600">
                                DESCRIPTION
                            </p>
                            <p className="text-md font-bold text-black dark:text-white">
                                {project.description}{" "}
                            </p>
                        </div>
                        {/* Start and End Date Component */}
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <p className="text-xs font-medium text-gray-600">
                                    START DATE
                                </p>
                                <p className="text-md font-bold text-black dark:text-white">
                                    {project.startDate}{" "}
                                </p>
                                </div>
    
                                <div className="flex flex-col">
                                <p className="text-xs font-medium text-gray-600 uppercase">
                                    end date
                                </p>
                                <p className="text-md font-bold text-black dark:text-white">
                                    {project.endDate}{" "}
                                </p>
                            </div>
                        </div>
                        {/* Status and SDG Component */}
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <p className="text-xs font-medium text-gray-600 uppercase">
                                    SDG
                                </p>
                                <p className="text-md font-bold text-black dark:text-whit py-2">
                                    {project.category} - {findSDGName(project.category)}{" "}
                                </p>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-xs font-medium text-gray-600 uppercase">
                                    status
                                </p>
                                <div className="text-md font-bold text-black dark:text-white">
                                    <Menu as="div" className="relative w-full inline-block text-left">
                                        <div>
                                        <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            {project.status === "" ? "Select Status" : project.status}
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
                                        <Menu.Items className="absolute right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[5rem] overflow-y-auto">
                                            <div className="">
                                            
                                                <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm w-full text-left'
                                                        )}
                                                        onClick={() => handleUserInput("status", "Completed")}
                                                    >
                                                        In Progress
                                                    </button>
                                                )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm w-full text-left'
                                                        )}
                                                        onClick={() => handleUserInput("status", "Completed")}
                                                    >
                                                        Completed
                                                    </button>
                                                )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm w-full text-left'
                                                        )}
                                                        onClick={() => handleUserInput("status", "Completed")}
                                                    >
                                                        Cancelled
                                                    </button>
                                                )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm w-full text-left'
                                                        )}
                                                        onClick={() => handleUserInput("status", "Completed")}
                                                    >
                                                        Delayed
                                                    </button>
                                                )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
    
                            
                        </div>
                        {/* Members Component */}
                        <div className="w-full flex flex-col items-start justify-between gap-0">
                            <p className="text-xs font-medium text-gray-600">
                                MEMBERS
                            </p>
                            <p className="text-md font-bold text-black dark:text-white">
                                PROJECT DESCRIPTION HERE PROJECT DESCRIPTION HERE PROJECT DESCRIPTION HER
                            </p>
                        </div>
    
                    </div>
                </div>
            </Card>
        );
    }
};


