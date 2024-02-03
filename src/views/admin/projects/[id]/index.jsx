// components/project/ProjectDetails.jsx
import React, { useState } from 'react';
import ProjectDescriptionCard from "../components/ProjectDescriptionCard";
import Modal from 'react-modal';
// for icon
import { FaUpload } from "react-icons/fa";


const ProjectDetails = () => {
    
    // get the id from the local storage
    const id = localStorage.getItem("projectId");


    // SIMON UR CODE IS HERE
    const [isModalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [localFilePath, setLocalFilePath] = useState('');

    const handleUpload = () => {
        // Open the modal 
        setModalOpen(true);
    };

    const handleFileUpload = (e) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }

        setFile(selectedFiles[0]);
    };

    // close modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // css for modal
    const modalStyles = {
        content: {
            width: '50%', // Set the width as per your requirement
            height: '50%', // Set the height as per your requirement
            margin: 'auto', // Center the modal
        },
    };

    // for fetch 
    const uploadToDatabase = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsUploading(true);
            const response = await fetch('http://localhost:5050/resource', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                // Set the file URL and local file path for display
                setFileUrl(data.file_url);
                setLocalFilePath(data.local_file_path);
                window.location.reload();
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <div className="mt-3 grid h-full flex-col gap-5 px-2 relative w-full">
                <div className="h-fit w-full xl:col-span-1 2xl:col-span-2 overflow-x-auto relative">
                    <div className='h-fit w-full relative'>
                        {/* Project Description Card */}
                        <ProjectDescriptionCard id={id} className=""/>
                    </div>
                    


                    {/* Resource Sharing setion */}
                    <div className="mb-3 mt-12 flex flex-col items-start gap-3 px-2">
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        Resources
                        </h4>
                    </div>
                        
                    <div className='w-full h-full relative'>
                        <button className='w-full h-fit p-12 bg-white hover:bg-gray-200 border border-black rounded-md flex flex-col gap-5 justify-center items-center' onClick={handleUpload}>
                            <FaUpload className='w-10 h-auto' />
                            <span className='text-xl font-bold text-black'>Upload</span>
                        </button>
                        {/* modal content */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="File Upload Successful"
                            className="absolute w-1/2 h-1/2 bg-white border border-black rounded-md  z-[99] top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                        >
                            <h2 className='text-2xl mb-20 font-bold'>Upload Resource</h2>
                            <input type="file" onChange={handleFileUpload} className='flex items-center justify-center border border-black rounded-md'/>
                            {file && (
                                <div>
                                    <p>File Name: {file.name} ({Math.round(file.size / 1024)} KB)</p>
                                    <p>File Type: {file.type}</p>
                                </div>
                            )}
                            <div className='w-full flex flex-row gap-20 items-center justify-center mt-16'>
                                <button className='px-6 py-2 border border-black rounded-md hover:bg-blueSecondary hover:text-white' disabled={isUploading} onClick={uploadToDatabase}>
                                    {isUploading ? 'Uploading...' : 'Upload'}
                                </button>
                                <button className='px-6 py-2 border border-black rounded-md hover:bg-blueSecondary hover:text-white' onClick={closeModal}>Close</button>
                            </div>
                        </Modal>
                    </div>



                    {/* Project Tasks setion */}
                    <div className="mb-5 mt-12 flex items-center justify-between px-2">
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        Tasks
                        </h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;