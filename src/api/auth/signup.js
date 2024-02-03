import ApiRoutes from "../../ApiRoutes";
const apiRoutes = new ApiRoutes();

async function SignUp(data) {
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      redirect: "follow",
    };
  
    try {
        const response = await fetch(
            "http://" + apiRoutes.authSVC + "/signup",
            requestOptions
        );
    
        return response;
    } catch (error) {
        console.log(error);
        return { error: true };
    }
}
  
export default SignUp;