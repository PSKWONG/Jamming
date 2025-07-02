import React from 'react';
import styles from './system.module.css';


function SystemMessage(props) {

    let displayContent; 

    const {isPublicAccessToken,isPrivateAccessToken} = props.accessToken;

    switch(true){

        case (isPublicAccessToken === true || isPrivateAccessToken === true ) :
            displayContent = <></>;
            break;
        
        case (isPublicAccessToken === false || isPrivateAccessToken ===false):
            displayContent = 
            <div className = {`${styles.messageContainer} ${styles.errorMessage}`}>
                <span>Failed to retrieve Spotify Services. Please try again later.</span>
            </div>;
            break; 

        default:
            displayContent = 
            <div className = {`${styles.messageContainer} ${styles.loadingMessage}`}>
                <span>Loading...</span>
            </div>;
    }


    return(
        <>
        {displayContent}
        </>
    )
}

export default SystemMessage;