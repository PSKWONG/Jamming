
// Access Token =======================================================================
const clientId = 'c7441c598089429180fc19029ec4f0ec'
const redirectUri = 'http://localhost:3000/';
var accessToken;

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
    if (data.length == 0) {
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
    const addingTrackResponse = fetch(addingTrackURL, {
      "method" : "POST",
      "headers" : headerComponent,
      "body" : addingTrackBodyCompnent
    })


  }catch (err){
    console.log(err)
  }







}