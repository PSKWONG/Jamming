import React from 'react';


function SystemMessage(props) {

    let displayContent; 

    const {isPublicAccessToken, isPrivateAccessToken} = props;

    if(isPublicAccessToken === null){
        displayContent = "Loading...";
    }else if(isPublicAccessToken === false){
        displayContent = "Failed to retrieve public access token.";
    }else{
        displayContent = "Public access token retrieved successfully.";
    }

    


    return(
        <div>
            <span>{message}</span>
        </div>
    )
}

export default SystemMessage;