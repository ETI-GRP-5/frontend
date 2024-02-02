// components/project/ProjectDetails.jsx
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectSlug } = useParams();

  useEffect (() => {
    console.log(projectSlug)
  }, [projectSlug])

  return (
    <div className='text-black'>
      <h2>Project Details for {projectSlug}</h2>
      {/* Display project details here */}
      <p>This is a placeholder for project details.</p>
    </div>
  );
};

export default ProjectDetails;