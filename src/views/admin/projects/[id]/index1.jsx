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
      <div className="mt-3 grid h-full flex-col gap-5 px-2">
        <div className="h-fit w-full xl:col-span-1 2xl:col-span-2 overflow-x-auto">
          {/* Project Description Card */}
          <ProjectDescriptionCard id={id} />


          {/* Resource Sharing setion */}
          <div className="mb-5 mt-12 flex items-center justify-between px-2">
            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
              Resources
            </h4>

            <div>
              <button style={{
                  border: '1px solid black',
                  padding: '10px',
                  borderRadius: '10px'

              }} onClick={handleUpload}>
                  Upload <FaUpload style={{ marginRight: '50px' }} /></button>
              {/* modal content */}
              <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="File Upload Successful"
                  style={modalStyles}
              >
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
          </div>
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