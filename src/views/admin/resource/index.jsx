// resource > index.jsx

import React, { useState } from 'react';

const FileUploadView = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [localFilePath, setLocalFilePath] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileUpload = (e) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }

        setFile(selectedFiles[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const uploadToDatabase = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        try {
            setIsUploading(true);
            const response = await fetch('http://localhost:5000/resource', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                // Set the file URL and local file path for display
                setFileUrl(data.file_url);
                setLocalFilePath(data.local_file_path);
                openModal(); // Open the modal after successful upload
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
            <h2>File Upload</h2>
            <input type="file" onChange={handleFileUpload} />
            {file && (
                <div>
                    <p>File Name: {file.name}</p>
                    <p>File Type: {file.type}</p>
                    <p>File Size: {Math.round(file.size / 1024)} KB</p>
                </div>
            )}
            <button disabled={isUploading} onClick={uploadToDatabase}>
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            {fileUrl && (
                <div>
                    <p>File URL: {fileUrl}</p>
                </div>
            )}
            {localFilePath && (
                <div>
                    <p>Local File Path: {localFilePath}</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <p>File has been uploaded successfully!</p>
                        <p>File URL: {fileUrl}</p>
                        <p>Local File Path: {localFilePath}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploadView;
