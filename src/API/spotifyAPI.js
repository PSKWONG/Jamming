// Import necessary libraries
import axios from 'axios';

//Variables to hold token 
var publicAccessToken = null;
var privateAccessToken = null;

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; 
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; 

//Helper function
const checkAccessToken = () => {
    return {
        publicAccessToken: publicAccessToken !== null, 
        privateAccessToken: privateAccessToken !== null
    }
};

//Function to get public access token
const getPublicAccessToken = async () => {

    

    if (publicAccessToken !== null){
        return publicAccessToken;
    } else {
        // If public access token is not available, we need to request a new one
        //Variable to get public access token from Spotify
        const requestURL = 'https://accounts.spotify.com/api/token'; 
        const authParameters = {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        }; 
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        
        try {
            const {data} = await axios.post(requestURL,authParameters, { headers });
            publicAccessToken = data.access_token; //Store the access token

            console.log("Public Access Token:", publicAccessToken);
            return publicAccessToken;

        } catch (error) {
            console.error("Error fetching public access token:", error);
            throw error;
        }
    }
}

//Export the functions
export { getPublicAccessToken, checkAccessToken };