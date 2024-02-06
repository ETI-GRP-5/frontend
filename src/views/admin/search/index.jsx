import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchView = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSdg, setSelectedSdg] = useState(null);

  // Function to handle search
const handleSearch = async () => {
  try {
    // Clear selectedSdg and search results when a new search is performed
    setSelectedSdg(null);
    setSearchResults([]);

    if (!query) {
      // If query is empty, show "No records found" only after the search button is clicked
      return;
    }
    const lowerCaseQuery = query.toLowerCase();

    // Check if the query is "Project 1", "Project 2", or "Project 3"
    const projectQueries = ['project 1', 'project 2', 'project 3'];
    if (projectQueries.includes(lowerCaseQuery)) {
      // Use hardcoded data for the specified projects
      const projectData = {
        'project 1': {
          project_id: "1",
          project_title: "Project 1",
          project_detail: "Details of Project 1",
        },
        'project 2': {
          project_id: "2",
          project_title: "Project 2",
          project_detail: "Details of Project 2",
        },
        'project 3': {
          project_id: "3",
          project_title: "Project 3",
          project_detail: "Details of Project 3",
        },
      };

      setSearchResults([projectData[lowerCaseQuery]]);
    } else {
     // Actual API call
const response = await fetch(`http://localhost:3018/api/search?query=${lowerCaseQuery}`);

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

const result = await response.json();
console.log(result); // Log the response

// Check if there are results and display a success message
if (result.results && result.results.length > 0) {
  setSearchResults(result.results);
  alert(`You have found ${result.results[0].project_title}`);
} else {
  // If no results, display a message
  setSearchResults([]);
  alert('No records found');
}
    }
    
  } catch (error) {
    console.error('Error during search:', error);
    // Handle the error, e.g., display an error message to the user
  }
};

  // Data for all 17 SDGs with names and descriptions
  const sdgsData = [
    {
        id: 1,
        name: 'No Poverty',
        description: 'End poverty in all its forms everywhere.',
      },
      {
        id: 2,
        name: 'Zero Hunger',
        description: 'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.',
      },
      {
        id: 3,
        name: 'Good Health and Well-being',
        description: 'Ensure healthy lives and promote well-being for all at all ages.',
      },
      {
        id: 4,
        name: 'Quality Education',
        description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.',
      },
      {
        id: 5,
        name: 'Gender Equality',
        description: 'Achieve gender equality and empower all women and girls.',
      },
      {
        id: 6,
        name: 'Clean Water and Sanitation',
        description: 'Ensure availability and sustainable management of water and sanitation for all.',
      },
      {
        id: 7,
        name: 'Affordable and Clean Energy',
        description: 'Ensure access to affordable, reliable, sustainable, and modern energy for all.',
      },
      {
        id: 8,
        name: 'Decent Work and Economic Growth',
        description: 'Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all.',
      },
      {
        id: 9,
        name: 'Industry, Innovation, and Infrastructure',
        description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation.',
      },
      {
        id: 10,
        name: 'Reduced Inequality',
        description: 'Reduce inequality within and among countries.',
      },
      {
        id: 11,
        name: 'Sustainable Cities and Communities',
        description: 'Make cities and human settlements inclusive, safe, resilient, and sustainable.',
      },
      {
        id: 12,
        name: 'Responsible Consumption and Production',
        description: 'Ensure sustainable consumption and production patterns.',
      },
      {
        id: 13,
        name: 'Climate Action',
        description: 'Take urgent action to combat climate change and its impacts.',
      },
      {
        id: 14,
        name: 'Life Below Water',
        description: 'Conserve and sustainably use the oceans, seas, and marine resources for sustainable development.',
      },
      {
        id: 15,
        name: 'Life on Land',
        description: 'Protect, restore, and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.',
      },
      {
        id: 16,
        name: 'Peace, Justice, and Strong Institutions',
        description: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable, and inclusive institutions at all levels.',
      },
    {
      id: 17,
      name: 'Partnerships for the Goals',
      description: 'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.',
    },
  ];

  // Function to handle "See more" click for SDGs
  const handleSeeMoreClick = (sdg) => {
    setSelectedSdg(sdg);
  };

  // Function to truncate text
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  // Function to handle popup close
  const handleClosePopup = () => {
    setSelectedSdg(null);
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Search for projects</h2>
      <p className="text-gray-600 mb-4">Enter the project name in the search bar below:</p>

      <div className="mb-6 flex items-center justify-center">
        {/* Search bar */}
        <input
          className="p-3 w-96 border rounded-md focus:outline-none focus:border-blue-500"
          type="search"
          placeholder="Enter SDG or project name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* Display search results below the search input */}
      <div className="text-left mt-4">
        <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchResults.map((result, index) => (
            <div key={index} className="m-4 p-4 bg-gray-100 rounded-md text-center">
              <h3 className="text-lg font-semibold">{result.project_title}</h3>
              <p>{result.project_detail}</p>
              <Link to={`/project/${result.project_id}`}>
                <button className="mt-2 p-2 bg-blue-500 text-white rounded-md">
                  View
                </button>
              </Link>
            </div>
          ))}
          </div>
          
        ) : (
          query && !searchResults.length && <p style={{ color: 'red' }}>No records found</p>
        )}
      </div>

      <div className="container mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'green' }}>List of SDG</h2>
      <p className="text-gray-600 mb-4">Discover projects in various SDGs and find one that you could contribute in!</p>
    </div>

      {/* Display cards for all 17 SDGs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sdgsData.map((sdg) => (
          <div key={sdg.id} className="m-4 p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-semibold">{`SDG ${sdg.id}: ${sdg.name}`}</h3>
            <p>
              {truncateText(sdg.description, 100)}
              {sdg.description.length > 100 && (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleSeeMoreClick(sdg)}
                >
                  See more
                </span>
              )}
            </p>
            {/* Add onClick handler to navigate to SDG-specific page */}
          </div>
        ))}
      </div>

      {/* Popup for full description */}
      {selectedSdg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md max-w-md">
            <h2 className="text-lg font-bold mb-2">{`SDG ${selectedSdg.id}: ${selectedSdg.name}`}</h2>
            <p>{selectedSdg.description}</p>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchView;
