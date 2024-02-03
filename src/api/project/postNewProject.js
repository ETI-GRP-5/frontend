import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function PostNewProject(data) {
    try {
        const response = await fetch("http://" + apiRoutes.projectSVC + "/postProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectData: data }), // Send data in the expected format
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default PostNewProject;