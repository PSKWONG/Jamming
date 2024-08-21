import { disableAuthenComponent } from "../component/Authentication/authenComponent";

const clientId = 'c7441c598089429180fc19029ec4f0ec'
const redirectUri = 'http://localhost:3000/';
var accessToken;

export function checkAccessToken () {
  if (accessToken){
    return true; 
  } else {
    return false; 
  }
}

export function extractAccessToken (){
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if(accessTokenMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    window.setTimeout(() => accessToken = '', expiresIn*1000);
    window.history.pushState('Access Token', null, redirectUri); // This clears the parameters, allowing us to grab a new access token when it expires.
  }

}

export function getAccessToken() {

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  //Parameter to pass for authentication
  var scope = 'playlist-modify-public playlist-modify-private';
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(clientId);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirectUri);

  if(accessToken){ // <Senario 1 - If access Token is avaliable > 
    return accessToken; 
  }else{ // <Senario 2 - If access Token is NOT avaliable > 
    window.location = url;
    extractAccessToken();
  }
  
}

