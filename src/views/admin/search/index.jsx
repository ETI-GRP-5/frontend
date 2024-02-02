import React, { useState } from 'react';

const SearchView = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSdg, setSelectedSdg] = useState(null);

  // Function to handle search
  const handleSearch = async () => {
    try {
      // Make an HTTP request to your Go server's search endpoint
      const response = await fetch(`http://localhost:8080/api/search?query=${query}`);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();

      // Update the searchResults state with the obtained data
      setSearchResults(result.results);
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

  // Function to handle "See more" click
  const handleSeeMoreClick = (sdg) => {
    setSelectedSdg(sdg);
  };

  // Function to handle popup close
  const handleClosePopup = () => {
    setSelectedSdg(null);
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Search for SDGs or Projects</h2>
      <p className="text-gray-600 mb-4">Enter the SDG or project name in the search bar below:</p>

      <div className="mb-6 flex items-center justify-center">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Display cards for all 17 SDGs */}
        {sdgsData.map((sdg) => (
          <div key={sdg.id} className="m-4 p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-semibold">{`SDG ${sdg.id}: ${sdg.name}`}</h3>
            <p>
              {sdg.description.length > 100
                ? `${sdg.description.substring(0, 100)}... `
                : sdg.description}
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Search Results for "{query}"</h2>

      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((result, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{result.sdgName}</h3>
              <ul>
                {result.projects.map((project, projectIndex) => (
                  <li key={projectIndex}>{project}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}

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
