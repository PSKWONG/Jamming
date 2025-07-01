// Import necessary libraries
import axios from 'axios';

//Variables to hold token 
var publicAccessToken = null;
var privateAccessToken = null;

let feedbackParams; 
var accessToken = null;

//Variables to hold backend information 
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; 
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; 
const redirectUri = process.env.REACT_APP_ENVIRONMENT === "development"? "http://localhost:3000" : "https://emusicjamming.netlify.app/";


//Helper function
const checkAccessToken = () => {
    console.log('check the status' + publicAccessToken )
    return {
        puclicState: publicAccessToken !== null, 
        privateState: privateAccessToken !== null
    }
};

const checkIsFeedback = ()=>{

     //Extract the return information from URL returned
    const hash = window.location.hash ; 
    if( !hash ){
        return false; 
    }
    
    feedbackParams = new URLSearchParams (hash.substring(1)); 
    if ( 
        feedbackParams.has("access_token") && 
        feedbackParams.has("expires_in")){
            return true;
    }else{
        return false; 
    }
}

    

const getAccessToken = async () =>{
    if ( publicAccessToken && privateAccessToken){
        return publicAccessToken || privateAccessToken;
    }else if(checkIsFeedback()){ 
        extractPrivateToken(); 
        return privateAccessToken ; 
    }else{
        await getPublicAccessToken(); 
        return publicAccessToken; 
    }  
}


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
            console.log('Success on fetch public Token ' + publicAccessToken)
        } catch (error) {
            console.error("Error fetching public access token:", error);
            throw error;
        }
    }
}

//Function to get private access token
const getPrivateAccessToken = async ()=>{

    //Parameter to pass for authentication
    var scope = 'playlist-modify-public playlist-modify-private';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    
    //Put URL to the windows 
    window.location = url ;
}

const extractPrivateToken = ()=>{

    //Extract the return information from URL returned
        privateAccessToken = feedbackParams.get("access_token"); 
        const expiryTime = Number( feedbackParams.get("expires_in")); 

        console.log("Successfully fetched Private Access Token")

        //Set the expiry time for private token 
        
        window.setTimeout(()=>{
            privateAccessToken = null;
        }, expiryTime * 1000) ; 
    
        //Push the windows State the prevent Access Token leaskage
        window.history.pushState('Authentication', null, redirectUri); 
}



// Searching Function  =======================================================================
const getSearchResult = async(inputValue)=>{
    //Config Searching API
    let searchURL = 'https://api.spotify.com/v1/search?';
    const searchingString = `q=${encodeURIComponent(inputValue)}`; 
    const type = '&type=album%2Ctrack%2Cartist'
    const limit = 20
    const offSet = 0

    searchURL += searchingString + type + `&limit=${limit}&offset=${offSet}`;

    //Headers 
    const search_AccessToken = await getAccessToken();
    const headerComponent = {
    "Authorization": "Bearer " + search_AccessToken
    }

    //Get Result from Spotify API
    try{
        const response = await axios.get(searchURL, { headers: headerComponent });
        const tracks = response.data.tracks.items; //Get the data from the response

        return tracks;
        
    }catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }

}




//Export the functions
export { 
    getPublicAccessToken, 
    getPrivateAccessToken, 
    getAccessToken,
    checkAccessToken, 
    extractPrivateToken, 
    getSearchResult 
};