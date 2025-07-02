
import '../../style/Page.css';
import AppStyle from './Page.module.css';

import HeaderSection from '../header/Header';
import { SearchingContainer } from '../searching/SearchingComponent';
import { UsertDisplayContainer } from '../userListContainer/userDisplayListContainer';
import SystemMessage from '../systemMessage/SystemMessage';



function PageWrapper(props) {

  //Variable to control components
  const {isPublicAccessToken} = props.accessToken;
  const {searchResult} = props

  return (
    <div className={AppStyle.AppContainer}>
      <HeaderSection />
      <div className = {AppStyle.ContentContainer}>
        <SystemMessage accessToken = {props.accessToken} />

        {isPublicAccessToken && 
          <SearchingContainer 
            searchingControl = {props.searchingControl} 
            searchResult = {searchResult} 
            storeActions = {props.storeActions}  
          />
        }
        
        {isPublicAccessToken &&  
          <UsertDisplayContainer 
          storeTrack={props.storeTrack} 
          playListControl={props.playListControl} 
          storeActions = {props.storeActions} 
          />
        }
    
      </div>
    </div>
  );
}

export default PageWrapper;


