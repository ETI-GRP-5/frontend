import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function UpdateProject(id, data) {
    console.log("Updating project with id: " + id);
    console.log("New status: " + JSON.stringify({ status: data }));
    try {
        const response = await fetch("http://" + apiRoutes.projectSVC + "/updateProject/" + id, {
            method: "PUT", // Using PUT for updating an existing resource
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: data }), // Send the new status in the request body
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default UpdateProject;