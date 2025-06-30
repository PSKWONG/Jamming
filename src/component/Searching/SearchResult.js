import React from 'react';
import styles from './resultDisplay.module.css';
import { SongDetail } from '../trackDetail/songDetail';


const SearchDisplay = React.memo((props) => {
    
    //Variable to store the Song Detail Components 
    let playList; 
    //Extract the data from pros
    const {searchResult} = props; 
    const { handleAddTractToStore }= props.storeActions; 
    
    //------------------Constructing Components ----------------------
    // Only expand the search result when the Map size is not 0     
    if(searchResult.size !== 0){

        //Convert Map object into array 
        const tracks = [...searchResult] //Convert to array 
        playList = tracks.map(([key,data])=>{ // Map the array with components template 
            return <SongDetail key={key} trackDetail={data}  id={key} action={["add", handleAddTractToStore]}/>
        })  
    }

    return (
        <div className={styles.resultDisplayContainer}>
            <h1>Result</h1>
            <div className={styles.resultListContainer}>
               {playList}
            </div>
        </div>
    );

})

//Export the Component
export { SearchDisplay }; 