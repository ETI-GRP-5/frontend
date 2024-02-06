import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function UploadProfilePic(data, id) {
    const formData = new FormData();
    formData.append('image', data);
    const requestOptions = {
        credentials: "include",
        method: "POST",
        body: formData,
        redirect: "follow",
    };
  
    try {
        const response = await fetch(
            "http://" + apiRoutes.authSVC + "/changeProfilePic" + "/" + id,
            requestOptions
        );
    
        return response;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}
  
export default UploadProfilePic;