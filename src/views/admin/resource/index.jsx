// resource > index.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// for icon
import { FaUpload } from "react-icons/fa";

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

    // fetch for upload to database and storage
    const uploadToDatabase = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsUploading(true);
            const response = await fetch('http://localhost:3011/resource', {
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
        <div>

            <button style={{
                border: '1px solid black',
                padding: '10px',
                borderRadius: '10px'

            }} onClick={handleUpload}>
                Upload <FaUpload style={{ marginRight: '50px' }} /></button>
            <div style={{ marginTop: '50px' }}>
                {resources.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '18px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
                                <th style={{ padding: '10px' }}>Name</th>
                                <th style={{ padding: '10px' }}></th>
                                <th style={{ padding: '10px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((resource, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                    <td>{resource.Name}</td>
                                    <td>
                                        <button onClick={() => handleDownload(resource.FilePath)}>
                                            Download
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => openDeleteModal(resource)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No resource has been uploaded...</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="File Upload Successful" style={modalStyles}>
                <h2 style={{
                    fontSize: '20px',
                    marginBottom: '20px'
                }}><b>Upload Resource</b></h2>
                <input type="file" onChange={handleFileUpload} />
                {file && (
                    <div>
                        <p>File Name: {file.name} ({Math.round(file.size / 1024)} KB)</p>
                        <p>File Type: {file.type}</p>
                    </div>
                )}
                <div>
                    <button style={{ marginRight: '40px', marginTop: '100px' }} disabled={isUploading} onClick={uploadToDatabase}>
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal} contentLabel="Confirm Deletion" style={modalStyles}>
                <h2 style={{ fontSize: '20px', marginBottom: '20px' }}><b>Confirm Deletion</b></h2>
                <p>Are you sure you want to delete this resource?</p>
                <div>
                    <button style={{ marginRight: '40px' }} onClick={handleDelete}>
                        Confirm
                    </button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
        </div>
    );
};

export default ResourceUpload;