import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function ReadOrg(id) {
    try {
        const response = await fetch("http://" + apiRoutes.organisationSVC + "/read-org/" + id);
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default ReadOrg;