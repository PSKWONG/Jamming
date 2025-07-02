import { useState , useEffect} from 'react';
import {getPrivateAccessToken, getUserInfo, createNewPlayList, addItemsToPlayList} from '../../api/spotifyAPIHandler'; 

const useStoredPlayList =(token)=>{

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

    const clearStoreTrack = () => {
        setStoreTrack(new Map());
    }


    const downloadFromLocalStorage = async()=>{
        const storedData = localStorage.getItem('storeTrack'); 
        if(storedData){
            const parsed = await JSON.parse(storedData); 
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
    
    const exportNewPlayList = async(title, trackList)=>{
        const userInfo = await getUserInfo();
        const newListID = await createNewPlayList(title, userInfo); 
        const response = await addItemsToPlayList(newListID,trackList ); 

        if(response){
           clearStoreTrack(); 
           localStorage.removeItem('storeTrack');
        }
        

    }


    const handleExportButton = (event)=>{
        event.preventDefault(); 

        //Checking the input is ready
        if (!listTitle.trim()){
            alert("Please check the title of stored play list"); 
            return; 
        }

        if(storeTrack.size === 0 ){
            alert("Please add track to the play list"); 
            return; 
        }

        const title = listTitle.trim(); 
        const trackList = [...storeTrack.keys()]; 

        exportNewPlayList(title,trackList ); 

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
            action: isPrivateAccessToken? handleExportButton : handleLoginService
        },
        listTitle:{
            title: listTitle, 
            action: {handlePlayListTitle,resetPlayListTitle}
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

    // Load Saved Play List 
    useEffect(()=>{
        downloadFromLocalStorage(); 
    },[]);

    //Actions as a bundle 
    const storeActions = {
        handleAddTractToStore,
        handleRemoveTrackFromStore,
        
        downloadFromLocalStorage,
    }


    return {storeTrack, storeActions, playListControl};
}

export default useStoredPlayList;