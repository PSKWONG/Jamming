// Import necessary libraries
import axios from 'axios';

//Variables to hold token 
var publicAccessToken = null;
var privateAccessToken = null;

let feedbackParams; 

//Variables to hold backend information 
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; 
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; 
const redirectUri = process.env.REACT_APP_ENVIRONMENT === "development"? "http://localhost:3000" : "https://emusicjamming.netlify.app/";


// Checking Function  =======================================================================
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

// Access Token   =======================================================================

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
    if(privateAccessToken){
        return privateAccessToken; 
    }

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

// Exporting Play List Function  =======================================================================

const getUserInfo = async()=>{

    if(!privateAccessToken){
        console.log("When get user Information" + privateAccessToken)
        throw(new Error("Spotify Service is not avaliable before login"))
    }

    const url = "https://api.spotify.com/v1/me"; 
    const headerComponent = {
        "Authorization": "Bearer " + privateAccessToken
    }

    //Get User Info
    try{
        const response = await axios.get(url, {
            headers: headerComponent
        }); 
        //checking 
        return response.data; 

    }catch(error){
        console.log("Fail to retrieve user information from Spotify"); 
        throw(error); 
    }
}

const createNewPlayList = async (title, userInfo)=>{

    //Fetch Data 
    const userID =userInfo.id;
    const name = userInfo.display_name; 

    const url = `https://api.spotify.com/v1/users/${userID}/playlists`; 

    const accessToken = await getPrivateAccessToken(); 

  

    const headerComponent = {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
    }; 
    const bodyContent = JSON.stringify({
        "name": `${title}`,
        "description": `${name} generated playlist`,
        "public": false
    });

    //Try to Fetch Data from Spotify Server for new Play List ID 

    try{

        console.log('Try to get the new playlist ID from Spotify - start ')

        const response = await fetch(url, {
            "method": "POST",
            "headers": headerComponent,
            "body": bodyContent
        })

        console.log('Try to destruct the response ')

        const playListData = await response.json()

        const playListID = playListData.id

        return playListID; 

    }catch(error){
        console.log("Fail to get the Playlist ID from Spotify"); 
        throw(error); 
    }




}

const addItemsToPlayList = async(listID, trackList)=>{

    //Fetch Data 
    const url =  `https://api.spotify.com/v1/playlists/${listID}/tracks`; 
    const accessToken = await getPrivateAccessToken(); 

    const headerComponent = {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
    }; 
    const bodyContent = JSON.stringify(
        {
        "uris" : trackList,
        "position": 0
        }
    )

    try{
        
        const response = await fetch(url, {
                                    "method" : "POST",
                                    "headers" : headerComponent,
                                    "body" : bodyContent
                                })

        return response !== null ; 

    }catch(error){
        console.log("Fail to add items to Play List" + error); 
        throw(error); 
    }

}




//Export the functions
export { 
    getPublicAccessToken, 
    getPrivateAccessToken, 
    getAccessToken,
    getUserInfo,
    checkAccessToken, 
    extractPrivateToken, 
    getSearchResult,
    createNewPlayList,
    addItemsToPlayList
};