import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function GetProjectDataById(id) {
    try {
        const response = await fetch("http://" + apiRoutes.projectSVC + "/getProject/" + id);
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default GetProjectDataById;