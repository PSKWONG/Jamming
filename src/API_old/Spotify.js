
// Access Token =======================================================================
//Information to access the Spotify API 
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; 
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; 
const redirectUri = process.env.REACT_APP_ENVIRONMENT === "development"? "http://localhost:3000" : "https://emusicjamming.netlify.app/";

// Variable to store the access token
var accessToken = localStorage.getItem('accessToken') || null;

//Function to get the access token from Spotify API
export async function getAccessTokenFromSpotify(type = 'client_credentials') {

  if (accessToken) {
    return accessToken;
  }
  // If access token is not available, we need to request a new one
  if (type === 'client_credentials') {
    await getClientCredentialsAccessToken();
  }

  console.log('Access Token:', accessToken);

}

//Function get Clinet Credentials Access Token
const getClientCredentialsAccessToken = async () => {
  let authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
    const data = await response.json();
    accessToken = data.access_token;
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
}






export function checkAccessToken() {
  if (accessToken) {
    return true;
  } else {
    return false;
  }
}

export function extractAccessToken() {
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, redirectUri); // This clears the parameters, allowing us to grab a new access token when it expires.
  }

}

export function getAccessToken() {

  if (accessToken) { // <Senario 1 - If access Token is avaliable > 
    return accessToken;
  } else { // <Senario 2 - If access Token is NOT avaliable > 

    //Parameter to pass for authentication
    var scope = 'playlist-modify-public playlist-modify-private';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);

    window.location = url;
    extractAccessToken();
  }

}

// Searching Function  =======================================================================
export async function getSearchresult(input) {
  //content to send 

  //Endpoint to post 
  let url = 'https://api.spotify.com/v1/search?'
  const qString = `q=${input}`
  const type = '&type=album%2Ctrack%2Cartist'
  const limit = 20
  const offSet = 0
  url += qString
  url += type
  url += `&limit=${limit}`
  url += `&offset=${offSet}`

  //Headers 
  const search_AccessToken = await getAccessToken();
  const headerComponent = {
    "Authorization": "Bearer " + search_AccessToken
  }

  try {

    const response = await fetch(url, {
      headers: headerComponent
    })

    let data = await response.json()
    data = data.tracks.items
    //check whether the return result is null 
    if (data.length === 0) {
      return [];
    } else {
      let trackData = data.map(
        (track) => {
          return {
            album: track.album.name,
            artist: track.artists[0].name,
            trackID: track.id,
            trackName: track.name,
            trackURI: track.uri,
            preview : track.preview_url
            
          }
        }
      )

      return trackData
    }
  } catch (err) {
    console.log(err)
  }
}

// Export Play List =======================================================================
async function getUserID() {
  const url = "https://api.spotify.com/v1/me"

  //Headers 
  const profile_AccessToken = await getAccessToken();
  const headerComponent = {
    "Authorization": "Bearer " + profile_AccessToken
  }

  try {

    const response = await fetch(url, {
      "method": "GET",
      "headers": headerComponent
    })
    const userData = await response.json()
    return userData.id

  } catch (err) {

    console.log(err)

  }

}


export async function exportPlaylist(input, trackList) {

  
  const userID = await getUserID();
  const playList_AccessToken = await getAccessToken();
  var playListID

  //Generate a NEW playlist to store the track 
  const url = `https://api.spotify.com/v1/users/${userID}/playlists`
  const headerComponent = {
    "Authorization": "Bearer " + playList_AccessToken,
    "Content-Type": "application/json"
  }
  const bodyContent = JSON.stringify(
    {
      "name": `${input}`,
      "description": "Edward Jamming Programme generated playlist",
      "public": false
    }
  )

  try {
    const response = await fetch(url, {
      "method": "POST",
      "headers": headerComponent,
      "body": bodyContent
    })

    const playListData = await response.json()
    playListID = playListData.id

  } catch (err) {
    console.log(err)
  }

  //Add Items into the NEW Playlist
  const addingTrackURL = `https://api.spotify.com/v1/playlists/${playListID}/tracks`
  const addingTrackBodyCompnent = JSON.stringify(
    {
      "uris" : trackList,
      "position": 0
    }
  )
  try{
    fetch(addingTrackURL, {
      "method" : "POST",
      "headers" : headerComponent,
      "body" : addingTrackBodyCompnent
    })


  }catch (err){
    console.log(err)
  }







}