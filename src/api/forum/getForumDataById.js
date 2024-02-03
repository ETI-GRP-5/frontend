import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function GetForumDataById(id) {
    try {
        const response = await fetch("http://" + apiRoutes.forumSVC + "/getForum/" + id);
        return response;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default GetForumDataById;