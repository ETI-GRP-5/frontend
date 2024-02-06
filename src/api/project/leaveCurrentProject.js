import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function leaveCurrentProject(id, data) {
    try {
        const response = await fetch("http://" + apiRoutes.projectSVC + "/leaveProject/" + id, {
            method: "DELETE", // Using PUT for updating an existing resource
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data }), // Send the new status in the request body
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default leaveCurrentProject;