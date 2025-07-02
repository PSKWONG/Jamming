import { useState , useEffect} from 'react';
import {getPrivateAccessToken} from '../../API/spotifyAPI'; 

const useLocalStorage =(token)=>{

    //Extract information from props
    const {isPrivateAccessToken} = token; 

    //Storage on states 
    const [storeTrack, setStoreTrack] = useState(new Map());
    const [listTitle, setListTitle] = useState('New Playlist'); 

    //Action with the store Play List 
    const handleAddTractToStore = (uri, trackData) => {

        setStoreTrack(prev => {
            let updated = new Map(prev); 
            updated.set(uri, trackData);
            return updated;
        });
    }

    const handleRemoveTrackFromStore = (uri) => {
    
        setStoreTrack(prev => {
            let updated = new Map(prev); 
            updated.delete(uri); 
            return updated; 
        });
    }

    const handleClearStoreTrack = () => {
        setStoreTrack(new Map());
    }

    const handleUploadToLocalStorage = () => {
        localStorage.setItem('storeTrack', JSON.stringify([...storeTrack]));
    }

    const handleDownloadFromLocalStorage = ()=>{
        const storedData = localStorage.getItem('storeTrack'); 
        if(storedData){
            const parsed = JSON.parse(storedData); 
            setStoreTrack(new Map(parsed)); 
        }

    }

    const handleLoginService = (event)=>{
        event.preventDefault(); 

        //If the store Track contain saved track , upload to the local Storage
        if( storeTrack.size !==0 ){
            localStorage.setItem('storeTrack', JSON.stringify([...storeTrack]));
        }
        //Get the Private Access Token 
        getPrivateAccessToken(); 
    }


    

    //Action to change Play List Title 
    const handlePlayListTitle = (event)=>{
        setListTitle(event.target.value); 
    }

    const resetPlayListTitle = ()=>{
        setListTitle(''); 
    }

    //Play List Control 
    const playListControl ={
        button:{
            instruction: isPrivateAccessToken ? "Save to" : "Login to",
            action: isPrivateAccessToken? handleLoginService : handleLoginService
        }
    }
    
    //Testing
    useEffect(()=>{
        /*
        for (let [key, value] of storeTrack) {
        console.log(`${key} => ${value}`);
        }
        */

    },[storeTrack])

    //Actions as a bundle 
    const storeActions = {
        handleAddTractToStore,
        handleRemoveTrackFromStore,
        handleClearStoreTrack,
        handleUploadToLocalStorage,
        handleDownloadFromLocalStorage,
        handlePlayListTitle,
        resetPlayListTitle,
        handleLoginService
    }


    return {storeTrack, storeActions, listTitle, playListControl};
}

export default useLocalStorage;