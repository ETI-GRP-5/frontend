import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function GetUserDataById(id) {
    try {
        const response = await fetch("http://" + apiRoutes.projectSVC + "/getUser/" + id);
        const responseJson = await response.json();
        console.log("Woop Woop", responseJson);
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default GetUserDataById;