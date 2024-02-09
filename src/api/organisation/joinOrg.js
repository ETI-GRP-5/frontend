import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function JoinOrg(id, data) {
    try {
        const response = await fetch("http://" + apiRoutes.organisationSVC + "/join-org/"+ id, {
            method: "PUT", // Using PUT for updating an existing resource
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID: data }), // Send the new status in the request body
        });
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default JoinOrg;