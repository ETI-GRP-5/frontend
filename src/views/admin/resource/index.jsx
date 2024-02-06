// resource > index.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAuth } from 'firebase/auth';
// for icon
import { FaUpload } from "react-icons/fa";
import ResourceList from './components/ResourceList';

const ResourceUpload = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [localFilePath, setLocalFilePath] = useState('');
    const [selectedResource, setSelectedResource] = useState(null);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        console.log('Fetching resources...');
        const fetchResources = async () => {
            try {
                const response = await fetch('http://localhost:3011/showresource');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched resources:', data);
                    setResources(data);
                } else {
                    console.error('Failed to fetch resources:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching resources:', error.message);
            }
        };

        fetchResources();
    }, []);


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
        setDeleteModalOpen(false);
        setSelectedResource(null);
    };

    const openDeleteModal = (resource) => {
        setSelectedResource(resource);
        setDeleteModalOpen(true);
    };

    // css for modal
    const modalStyles = {
        content: {
            width: '50%',
            height: '50%',
            margin: 'auto',
        },
    };
    const handleDownload = (filePath) => {
        const downloadUrl = `http://localhost:3011/download?filePath=${encodeURIComponent(filePath)}`;
        // Create a hidden link element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.download = filePath.split('/').pop(); // Set the downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (selectedResource) {
            try {
                const response = await fetch(`http://localhost:3011/deleteresource?filePath=${encodeURIComponent(selectedResource.FilePath)}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    window.location.reload();
                } else {
                    console.error('Resource deletion failed');
                }
            } catch (error) {
                console.error('Error deleting resource:', error.message);
            } finally {
                closeModal();
            }
        }
    };
    //retrieval of auth token
    const getAuthToken = async (auth) => {
        try {
            const user = await auth.currentUser;
            const authToken = await user.getIdToken();
            return authToken;
        } catch (error) {
            console.error('Error getting authentication token:', error.message);
            throw error;
        }
    };

    // fetch for upload to database and storage
    const uploadToDatabase = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsUploading(true);
            const auth = getAuth();
            const authToken = await getAuthToken(auth);
            const response = await fetch('http://localhost:3011/resource', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
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
        <div>

            <button className='w-full h-fit p-12 bg-white hover:bg-gray-200 border border-black rounded-md flex flex-col gap-5 justify-center items-center' onClick={handleUpload}>
                <FaUpload className='w-10 h-auto' />
                <span className='text-xl font-bold text-black'>Upload</span>
            </button>
            <ResourceList
                resources={resources}
                handleDownload={handleDownload}
                openDeleteModal={openDeleteModal}
            />

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="File Upload Successful" className="absolute w-1/2 h-1/2 bg-white border border-black rounded-md  z-[99] top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <h2 className='text-2xl mb-20 font-bold'>
                    <b>Upload Resource</b>
                </h2>
                <input className='flex items-center justify-center border border-black rounded-md' type="file" onChange={handleFileUpload} />
                {file && (
                    <div className="mt-6 ml-4">
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
            <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal} contentLabel="Confirm Deletion" style={modalStyles}>
                <h2 style={{ fontSize: '30px', marginBottom: '20px', marginLeft: '30%' }}><b>Confirm Deletion</b></h2>
                <p style={{ fontSize: '20px', marginLeft: '20%' }}>Are you sure you want to delete this resource?</p>
                <p style={{ fontSize: '15px', marginLeft: '10%' }}>Once you delete the resource, it cannot be recovered. Are you sure you want to proceed? </p>
                <div style={{ marginTop: '10%', marginLeft: '28%' }}>
                    <button style={{ marginRight: '40px', backgroundColor: '#1f2937', color: 'white', padding: '10px 34px' }} onClick={handleDelete}>
                        Confirm
                    </button>
                    <button style={{ backgroundColor: '#1f2937', color: 'white', padding: '10px 34px' }} onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
        </div >
    );
};

export default ResourceUpload;