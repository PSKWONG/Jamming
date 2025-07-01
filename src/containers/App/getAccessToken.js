import { useState, useEffect } from 'react';
import {
    getPublicAccessToken, 
    getPrivateAccessToken as fetchPrivateAccessToken,
    getAccessToken,
    checkAccessToken
} from '../../API/spotifyAPI';

const useGetAccessToken = ()=>{

    const [isPublicAccessToken, setIsPublicAccessToken] = useState(null);
    const [isPrivateAccessToken, setIsPrivateAccessToken] = useState(false);

    
    // Function to get the Access token from Spotify API
    useEffect(()=>{

        //Async function to run 
        const setTokenState = async()=>{
            await getAccessToken(); 

            //Initiate the checking process 
            const {puclicState, privateState} = checkAccessToken(); 

            //Set the Token Status 
            setIsPublicAccessToken(puclicState); 
            setIsPrivateAccessToken(privateState); 
        }

        //Once the page is rendering, start fetching the access token 
        setTokenState(); 

    }, []);

    //Cehcking 
    useEffect(()=>{
        console.log('Public: ' + isPublicAccessToken); 
        console.log('Private: '+ isPrivateAccessToken); 
    }, [isPublicAccessToken, isPrivateAccessToken])


    return {
        isPublicAccessToken,
        isPrivateAccessToken
    };
    

}

export default useGetAccessToken;

