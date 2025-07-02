import React from 'react';
import styles from './searching.module.css';
import { SongDetail } from '../trackDetail/TrackDetail';

export const SearchingContainer = React.memo((props) => {

    //Variable to control the component
    const [inputValue, handleSearchValue, handleSearchingBtn, resetSearchValue] = props.searchingControl;
    const {searchResult} = props; 
    const { handleAddTractToStore }= props.storeActions; 

    //Variable to store the Song Detail Components 
    let playList; 

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
        <div className={styles.serchingWrapper} >
            
            <div className={styles.serchingContainer}>
                <h1> Searching </h1>
                <form >
                    <input type="text" value={inputValue} onChange={handleSearchValue} onClick={resetSearchValue}></input>
                    <button type='submit' onClick={handleSearchingBtn} />
                </form>
            </div>
            
            {   searchResult.size !== 0
                &&
                <div className={styles.resultDisplayContainer}>
                    <h2>Result</h2>
                    <div className={styles.resultListContainer}>
                    {playList}
                    </div>
                </div>
            }

        </div>

    )

})



