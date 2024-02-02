import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import Datepicker from "react-tailwindcss-datepicker"; 
import SDGs from "../projects/variables/sdg.json"


import ProjectCard from "../projects/components/ProjectCard";
import CategoryCard from "components/card/CategoryCard";
import { TiPlus } from "react-icons/ti";


import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const sdgCategories = SDGs;


const Marketplace = () => {
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Created",
        category: "",
        creator: 123,
    });
    const [currentProjects, setCurrentProjects] = useState([]); 
    const [sdg, setSdg] = useState([]);
    const [sdgFilter, setSdgFilter] = useState(""); // State to store the SDG filter

    // // Call an API POST request to send the SDG data
    // useEffect(() => {
    //     // Post the SDG data to the API
    //     const postSdg = async () => {
    //         // console.log("json", JSON.stringify(sdgCategories));
    //         try {
    //             const response = await fetch("http://localhost:3010/postSdg", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ sdgData: sdgCategories }), // Send data in the expected format
    //             });
    //             console.log("response", response);
    //         } catch (error) {
    //             console.log("error", error);
    //         }
    //     }

    //     // Check if the SDG data is already fetched and posted
    //     if (sdg.length === 0) {
    //         postSdg();
    //     }
    // }, []); // Include sdg in the dependency array to ensure it runs when sdg changes


    useEffect(() => {
        //fetch the api in a try catch block
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3010/getProject");
                const json = await response.json();
                // sortSdg(json);
                // setSdg(json);
                setCurrentProjects(json);
                //console.log("json", json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);



    // Define a function to extract the number from the SDG string
    function extractNumber(sdgString) {
        // Split the string by space and get the last part which contains the number
        const parts = sdgString.split(" ");
        return parseInt(parts[1]);
    }

    // Define the comparison function
    function compare(a, b) {
        const sdgANumber = extractNumber(a.number);
        const sdgBNumber = extractNumber(b.number);

        // Compare the SDG numbers
        if (sdgANumber > sdgBNumber) {
            return 1;
        } else if (sdgANumber < sdgBNumber) {
            return -1;
        } else {
            return 0;
        }
    }

    // Define the sort function
    const sortSdg = (sdg) => {
        sdg.sort(compare);
    };


    const [value, setValue] = useState({ 
        startDate: null,
        endDate: null 
    }); 
        
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
        setNewProject({ ...newProject, startDate: newValue.startDate, endDate: newValue.endDate });
    } 

    function handleSdgFilterClick(sdgNumber) {
        // console.log("sdgNumber", sdgNumber);
        setSdgFilter(sdgNumber);
    };


    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    function clickAddNewProjectButton(){
        setOpen(true);
    }


    function handleUserInput(type, input) {
        // console.log("type:", type, "input:", input);
        setNewProject({ ...newProject, [type]: input });
    }

    async function handleCreateNewProject() {
        console.log("newProject:", newProject);
        
        try {
            const response = await fetch("http://localhost:3010/postProject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectData: newProject }), // Send data in the expected format
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
            <div className="mt-3 grid h-full flex-col gap-5 px-3">
                <div className="h-fit w-full xl:col-span-1 2xl:col-span-2 overflow-x-auto">
                {/* Categories */}
                <div className="mb-5 mt-5 flex items-center justify-between px-2">
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        Project Categories
                    </h4>
                </div>

                {/* Recently Add NFTs */}
                <div className="flex flex-row w-full overflow-x-auto gap-5" id="categories-scroll">
                    {sdgCategories.map((sdg, key) => (
                        <button key={key} className="w-full h-full" onClick={() => handleSdgFilterClick(sdg.number)}>
                            <CategoryCard
                                title={sdg.name}
                                alt={sdg.number}
                                color={sdg.colour}
                            />
                        </button>
                    
                    ))}
                </div>

                {/* NFt Header */}
                <div className="mb-4 mt-16 flex flex-col justify-between px-2 md:flex-row md:items-center">
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        All Projects
                    </h4>
                </div>

                {/* NFTs trending card */}
                <div className="z-20 grid grid-cols-3 gap-5">
                    <button 
                        className="w-full h-full bg-white border border-black rounded-md p-6 flex items-center justify-center flex-col gap-4 hover:bg-gray-200"
                        onClick={clickAddNewProjectButton}
                    > 
                        <TiPlus className="w-10 h-auto text-blueSecondary"/>
                        <p className="font-bold text-lg">Add New Project</p>
                    </button>
                    {currentProjects.map((project, key) => (
                        <div key={key} className={`w-full h-full ${sdgFilter == "" ? "flex" : project.projectData.category != sdgFilter ? "hidden" : "flex"}`}>
                            <ProjectCard
                                name={project.projectData.name}
                                description={project.projectData.description}
                                creator={project.projectData.creator}
                                members={100}
                                sdg={project.projectData.category}
                                id={project.id}
                            />
                        </div>
                        
                    ))}
                </div>

                {/* Recenlty Added setion */}
                {/* <div className="mb-5 mt-16 flex items-center justify-between px-2">
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        Recently Joined
                    </h4>
                </div> */}

                {/* Recently Add NFTs */}
                {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <ProjectCard
                        name="Abstract Colors"
                        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                        creator="Esthera Jackson"
                        members="91"
                        sdg="1"
                        id={5}
                    />
                    <ProjectCard
                        name="ETH AI Brain"
                        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                        creator="Nick Wilson"
                        members="7"
                        sdg="2"
                        id={6}
                    />
                    <ProjectCard
                        name="Mesh Gradients"
                        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                        creator="Will Smith"
                        members="291"
                        sdg="3"
                        id={7}
                    />
                    <ProjectCard
                        name="Mesh Gradients"
                        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                        creator="Will Smith"
                        members="291"
                        sdg="4"
                        id={8}
                    />
                </div> */}
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
                                    Create New Project
                                    </Dialog.Title>
                                    <div className="mt-7 w-full">
                                        <form class="space-y-4 w-full" action="#">
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="text" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Add Project Name" required onChange={(e) => handleUserInput("name", e.target.value)}/>
                                        </div>

                                        <div className="relative w-full h-full">
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                            <div class="flex items-center">
                                                <Datepicker 
                                                    value={value} 
                                                    onChange={handleValueChange} 
                                                    showShortcuts={true} 
                                                /> 
                                            </div>
                                        </div>


                                       

                                        


                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                            <Menu as="div" className="relative w-full inline-block text-left">
                                                <div>
                                                <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    {newProject.category === "" ? "Select Category" : newProject.category}
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
                                            <textarea rows="4" type="text" placeholder="Add Project Description" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(e) => handleUserInput("description", e.target.value)}/>
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
                                    onClick={handleCreateNewProject}
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

export default Marketplace;
