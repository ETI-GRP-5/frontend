import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function PostNewForum(data) {
    try {
        const response = await fetch("http://" + apiRoutes.forumSVC + "/postForum", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ forumData: data }), // Send data in the expected format
        });
        const responseJson = await response.json(); // Await the JSON parsing
        return responseJson;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}

export default PostNewForum;
