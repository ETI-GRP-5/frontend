// components/project/ProjectDetails.jsx
import React from 'react';

import Banner from "../components/Banner";
import AllCommentCard from "../components/AllCommentsCard";



const ProjectDetails = () => {
  
  // get the id from the local storage
  const id = localStorage.getItem("discussionId");

  return (
    <>
      <div className="mt-3 w-full h-full flex gap-5 px-2">
        <div className="h-fit w-full">
          {/* NFt Banner */}
          <Banner />

          <AllCommentCard />
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;