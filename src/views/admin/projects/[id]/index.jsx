// components/project/ProjectDetails.jsx
import React from 'react';
import ProjectDescriptionCard from "../components/ProjectDescriptionCard";


const ProjectDetails = () => {
  
  // get the id from the local storage
  const id = localStorage.getItem("projectId");

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