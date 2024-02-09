import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function ReadAllOrg() {
    try {
        const response = await fetch("http://" + apiRoutes.organisationSVC + "/read-all-org");
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default ReadAllOrg;