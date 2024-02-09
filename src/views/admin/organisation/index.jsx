import React, { useState, useEffect } from "react";
import ReadAllOrg from "../../../api/organisation/readAllOrg";
import { getAuth } from "firebase/auth";
import JoinOrg from "api/organisation/joinOrg";

const DisplayOrganisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReadAllOrg();
        if (response.status === "Success") {
          setOrganisations(response.data);
        } else if (response.message === "No organisations found.") {
          setOrganisations([]);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateNewOrg = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  const handleCreateOrgSubmit = async (formData) => {
    // Logic to create new organisation using formData
    // You can make an API call to your backend endpoint to create the new organisation
    // After successfully creating the organisation, you can update the organisations state to include the new organisation
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Organisations</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "20px",
        }}
      >
        {organisations.map((org) => (
          <div
            key={org.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{org.name}</h3>
            <p>Owner: {org.owner}</p>
            <p>Description: {org.description}</p>
            <p>Objectives: {org.objectives}</p>
            <p>Members: {org.members.join(", ")}</p>
            <button
              className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-300 xl:w-auto"
              onClick={() => handleJoinOrganisation(org.id)}
            >
              Join Organisation
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreateNewOrg}
        className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-300 lg:w-auto"
      >
        Create New Organisation
      </button>
      {showCreateForm && (
        <CreateOrgForm
          onClose={handleCloseForm}
          onSubmit={handleCreateOrgSubmit}
        />
      )}
    </div>
  );
};

const handleJoinOrganisation = async (orgId) => {
  try {
    const auth = getAuth();
    // Make a request to your backend endpoint to join the organization
    const response = await JoinOrg(orgId, auth.currentUser.uid);

    // Check if the request was successful
    if (response.ok) {
      // Organization joined successfully
      // You may want to fetch the updated list of organizations after joining
      window.location.reload(); // Assuming fetchData() fetches the updated list of organizations
    } else {
      // Handle error response
      console.error("Failed to join organization:", response.statusText);
    }
  } catch (error) {
    console.error("Error joining organization:", error.message);
  }
};

const CreateOrgForm = ({ onClose, onSubmit }) => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    owner: auth.currentUser.uid,
    members: [],
    name: "",
    description: "",
    objectives: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div>
      <h2>Create New Organisation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Objectives:</label>
          <input
            type="text"
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-300 lg:w-auto"
        >
          Create
        </button>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-300 lg:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DisplayOrganisations;
