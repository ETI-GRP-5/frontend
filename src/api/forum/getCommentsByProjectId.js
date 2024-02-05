import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function GetForumDataById(id) {
    try {
        const response = await fetch("http://" + apiRoutes.forumSVC + "/getComment/" + id);
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default GetForumDataById;