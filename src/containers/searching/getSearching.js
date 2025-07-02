import {useState, useEffect} from 'react';
import {getSearchResult} from '../../api/spotifyAPIHandler';



const useGetSearchingResult = ()=>{

    const [inputValue, setInputValue] = useState("Input HERE");
    const [searchResult, setSearchResult] = useState(new Map());

    //Handle the input box when user types in the input box
    const handleSearchValue = (event) => {
        setInputValue(event.target.value);
    }

    //Reset the input box when user clicks on the input box
    const resetSearchValue = () => {
        setInputValue('');
    }


    //Handle the searching event when button is clicked 
    const handleSearchingBtn = async(event) => {
        //Helper function on store the search result
        const storeSearchResult = (array) => {
            
            let store = new Map();

            //Check whether the array is empty
            if (array.length === 0) {
                return store;
            }
            //Store the search result into the Map
            array.forEach((track)=>{
                store.set(track.uri, {
                    album: track.album.name,
                    artist: track.artists[0].name,
                    trackName: track.name,
                    preview: track.preview_url
                })
            });

            //Return the Array as a Map 
            return store;
        }
        //Prevent Default Button Actions 
        event.preventDefault();

        console.log("Input value: " + inputValue);

        //Checking the input 
        if(!inputValue.trim()){
            alert('Please input keyword in searching');
            return;
        }

        try {
            const searchResult = await getSearchResult(inputValue);
            setSearchResult(storeSearchResult(searchResult));
        } catch (error) {
            console.error("Error fetching search results:", error);
            throw error;
        }
    }


    //Function Checking 
    useEffect(() => {
        console.log("Search Result Updated:", searchResult);
    }, [searchResult]);



    //Searching Result and Control Data to be exported
    //searchResult is the data that will be used to display the search result
    //searchingControl is the control data that will be used to handle the searching event
    const searchingControl = [
        inputValue,
        handleSearchValue,
        handleSearchingBtn,
        resetSearchValue
    ];

    return [searchResult, searchingControl];

}

//Export Searching Control 
export { useGetSearchingResult };