import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function GetAllForums() {
    try {
        const response = await fetch("http://" + apiRoutes.forumSVC + "/getForum");
        return response;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default GetAllForums;