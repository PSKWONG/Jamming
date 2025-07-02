
import '../../style/Page.css';
import styles from './home.module.css'; 

import HeaderSection from '../top/TopComponent';
import { SearchingContainer } from '../trackSearching/TrackSearching'; 
import { UsertDisplayContainer } from '../trackStore/TrackStore';
import SystemMessage from '../systemMessage/SystemMessage';



function PageWrapper(props) {

  //Variable to control components
  const {isPublicAccessToken, isPrivateAccessToken} = props.accessToken;
  const {searchResult} = props

  return (
    <div className={styles.AppContainer}>
      <HeaderSection />
      <div className = {styles.ContentContainer}>
        <SystemMessage accessToken = {props.accessToken} />

        { (isPublicAccessToken || isPrivateAccessToken ) && 
          <SearchingContainer 
            searchingControl = {props.searchingControl} 
            searchResult = {searchResult} 
            storeActions = {props.storeActions}  
          />
        }
        
        {(isPublicAccessToken || isPrivateAccessToken ) &&  
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


