// ResourceList.jsx
import React from 'react';

const ResourceList = ({ resources, handleDownload, openDeleteModal }) => {
    return (
        <div style={{ marginTop: '50px' }}>
            {resources.length > 0 ? (
                <table style={{ width: '80%', borderCollapse: 'collapse', fontSize: '18px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Uploaded By</th>
                            <th style={{ padding: '10px' }}></th>
                            <th style={{ padding: '10px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map((resource, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                <td>{resource.Name}</td>
                                <td>{resource.UploadedBy}</td>
                                <td>
                                    <button onClick={() => handleDownload(resource.FilePath)}>
                                        Download
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => openDeleteModal(resource)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No resource has been uploaded...</p>
            )}
        </div>
    );
};

export default ResourceList;
