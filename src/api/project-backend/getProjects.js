
async function GetProjects(){
    // perform try catch for the api
    try {
        // FETCH DATA FROM API
        const response = await fetch('http://localhost:3000/api/project-backend/getProjects', {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
        });
        // RETURN RESPONSE AS JSON
        return await response.json();

    } catch (error) {
        // RETURN ERROR
        console.log(error);
        return { error: true };
    } 
}
export default GetProjects;