import React from 'react';

//Import Components
import PageWrapper from '../../component/main/MainPage'; 
import useSetPageBackground from './backgroundHandler'; 
import useGetAccessToken from './accessTokenHandler';
import { useGetSearchingResult } from '../searching/getSearching';
import useStoredPlayList from '../trackDisplay/storePlayList'


//AppContainer is the main container of the App
const AppContainer = () => {
    //Use the custom hook to manage the state of the page
    useSetPageBackground();
    //Check the state of the access token
    const token = useGetAccessToken();
    //Searching Function 
    const [searchResult, searchingControl ] = useGetSearchingResult();
    //Stored Play List 
    const {storeTrack, storeActions, playListControl} = useStoredPlayList(token);
    

  

  return <PageWrapper 
    accessToken = {token}
    searchResult = {searchResult}
    searchingControl = {searchingControl}
    storeActions = {storeActions}
    storeTrack={storeTrack}
    playListControl = {playListControl}
  />;
}   

//Export the AppContainer component
export default AppContainer;