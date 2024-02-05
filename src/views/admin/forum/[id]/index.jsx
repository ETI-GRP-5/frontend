// components/project/ProjectDetails.jsx
import React from 'react';

import ForumDiscussion from "../components/ForumHeaderCard";
import AllCommentCard from "../components/AllCommentsCard";



const ProjectDetails = () => {
  
  // get the id from the local storage
  const id = localStorage.getItem("forumId");

  return (
    <>
      <div className="mt-3 w-full h-full flex gap-5 px-2">
        <div className="h-fit w-full">
          {/* NFt Banner */}
          <ForumDiscussion id={id}/>

          <AllCommentCard id={id}/>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;