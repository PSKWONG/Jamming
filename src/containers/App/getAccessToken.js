import { useState, useEffect } from 'react';
import {getPublicAccessToken} from '../../API/spotifyAPI';

const useGetAccessToken = ()=>{

    const [isPublicAccessToken, setIsPublicAccessToken] = useState(false);
    const [isPrivateAccessToken, setIsPrivateAccessToken] = useState(false);

    // Function to get the access token from Spotify API
    useEffect(()=>{
        const fetchPublicAccessToken = async () => {
            try {
                const token = await getPublicAccessToken();
                if (token) {
                    setIsPublicAccessToken(true);
                    console.log("Public Access Token fetched successfully.");
                } else {
                    setIsPublicAccessToken(false);
                    console.error("Failed to fetch Public Access Token.");
                }
            } catch (error) {
                setIsPublicAccessToken(false);
                console.error("Error fetching Public Access Token:", error);
            }
        };
        // Call the function to fetch the public access token
        fetchPublicAccessToken();
    }, []);

}

export default useGetAccessToken;

