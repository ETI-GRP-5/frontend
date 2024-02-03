import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function GetAllProjects() {
    try {
        const response = await fetch("http://" + apiRoutes.projectSVC + "/getProject");
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default GetAllProjects;