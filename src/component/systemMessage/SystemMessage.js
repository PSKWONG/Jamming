import React from 'react';
import styles from './system.module.css';


function SystemMessage(props) {

    let displayContent; 

    const {isPublicAccessToken} = props.accessToken;

    //let isPublicAccessToken = null // Testing purpose

    if(isPublicAccessToken === null){
        displayContent = 
            <div className = {`${styles.messageContainer} ${styles.loadingMessage}`}>
                <span>Loading...</span>
            </div>;
    }else if(isPublicAccessToken === false){
        displayContent = 
        <div className = {`${styles.messageContainer} ${styles.errorMessage}`}>
            <span>Failed to retrieve Spotify Services. Please try again later.</span>
        </div>;
    }else{
        displayContent = <></>;
    }

    return(
        <>
        {displayContent}
        </>
    )
}

export default SystemMessage;