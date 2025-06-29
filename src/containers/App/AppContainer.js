import {React} from 'react';

//Import Components
import PageWrapper from '../../component/page/Page';
import useSetPageBackground from './backgroundChanger';
import useGetAccessToken from './getAccessToken';
import { useGetSearchingResult } from '../searching/getSearchingResult';
import useLocalStorage from '../trackDisplay/storePlayList'


//AppContainer is the main container of the App
const AppContainer = () => {
    //Use the custom hook to manage the state of the page
    useSetPageBackground();
    //Check the state of the access token
    const { isPublicAccessToken, isPrivateAccessToken } = useGetAccessToken();
    //Searching Function 
    const [searchResult, searchingControl ] = useGetSearchingResult();
    //Stored Play List 
    const [storeTrack, storeActions] = useLocalStorage();
    

  

  return <PageWrapper 
    accessToken = {{ isPublicAccessToken, isPrivateAccessToken }}
    searchResult = {searchResult}
    searchingControl = {searchingControl}
    storeActions = {storeActions}
  />;
}   

//Export the AppContainer component
export default AppContainer;