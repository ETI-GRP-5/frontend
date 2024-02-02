
import { useState } from "react";
import Card from "components/card";
import { Link } from 'react-router-dom';

const ProjectCard = ({ name, description, creator, members, sdg, extra, id }) => {
  
  // create a function to store the project id in local storage
  function storeProjectId() {
    localStorage.setItem("projectId", id);
  }

  return (
    <Link 
      to={{
        pathname: `/admin/projects/${id}`
      }}
    >
      <button onClick={storeProjectId} className="w-full h-full">
        <Card
          extra={`flex flex-col w-full h-[15rem] !p-4 xl:!p-6 3xl:p-![20px] bg-white ${extra} hover:cursor-pointer hover:bg-gray-100`}
        >
            
          <div className="w-full h-full flex items-center justify-between px-2 flex-col gap-6">

            <div className="flex flex-col items-start justify-between w-full gap-3">
              <div className="rounded-full py-1 px-4 bg-blueSecondary text-white text-sm font-semibold">
                {sdg}
              </div>
              <p className="w-full text-left text-lg font-bold text-navy-700 dark:text-white">
                {name}{" "}
              </p>
              <p className="w-full text-sm font-medium text-gray-600 text-left line-clamp-4 text-balance">
                {description}{" "}
              </p>
            </div>

            <div className="w-full flex items-start lg:items-center justify-start lg:justify-between flex-col lg:flex-row">
              <p className="text-sm font-bold text-brand-500 dark:text-white">
                By: {creator}
              </p>
              <p className="text-sm font-bold text-brand-500 dark:text-white">
                Members: {members} <span>ppl</span>
              </p>
            </div>
          </div>

            
        </Card>
      </button>
    </Link>
    
  );
};

export default ProjectCard;
