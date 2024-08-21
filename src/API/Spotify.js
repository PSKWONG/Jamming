import { disableAuthenComponent } from "../component/Authentication/authenComponent";

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

  //Parameter to pass for authentication
  var scope = 'playlist-modify-public playlist-modify-private';
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(clientId);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirectUri);

  if (accessToken) { // <Senario 1 - If access Token is avaliable > 
    return accessToken;
  } else { // <Senario 2 - If access Token is NOT avaliable > 
    window.location = url;
    extractAccessToken();
  }

}

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
            trackURI: track.uri
          }
        }
      )

      return trackData
    }




    return data.tracks.items

  } catch (err) {
    console.log(err)
  }



}
