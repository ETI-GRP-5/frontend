import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function CreateNewOrg() {
    try {
        const response = await fetch("http://" + apiRoutes.organisationSVC + "/create-new-org");
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default CreateNewOrg;