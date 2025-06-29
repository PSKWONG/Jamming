import { useState } from 'react';

const useLocalStorage =()=>{

    const [storeTrack, setStoreTrack] = useState(new Map());

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

    //Actions as a bundle 
    const storeActions = [
        handleAddTractToStore,
        handleRemoveTrackFromStore,
        handleClearStoreTrack,
        handleUploadToLocalStorage,
        handleDownloadFromLocalStorage
    ]


    return [storeTrack, storeActions];
}

export default useLocalStorage;