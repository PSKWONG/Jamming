import {React} from 'react';

//Import Components
import PageWrapper from '../../component/Page/Page';
import useSetPageBackground from './backgroundChanger';
import useGetAccessToken from './getAccessToken';


//AppContainer is the main container of the App
const AppContainer = () => {
    //Use the custom hook to manage the state of the page
    useSetPageBackground();
    //Check the state of the access token
    const { isPublicAccessToken, isPrivateAccessToken } = useGetAccessToken();

  

  return <PageWrapper 
    accessToken = {{ isPublicAccessToken, isPrivateAccessToken }}
  />;
}   

//Export the AppContainer component
export default AppContainer;