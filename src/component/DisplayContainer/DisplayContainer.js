import React, { useEffect, useState } from 'react';
import displayResultStyles from './resultDisplay.module.css'
import { SongDetailContainer } from '../SongDetailContainer/songDetailContainer';


export function DisplayContainer(props) {

    // Store the information for Track List Items 
    const [resultlistItems, setResultlistItems] = useState();

    // When the search result is updated, the Track List is triggered   
    useEffect(() => {
        console.log(props.displayList)

        if (props.displayList.length != 0) {

            let resultCards = props.displayList.map(
                (trackInfo) => {
                    console.log(trackInfo)
                    return <SongDetailContainer trackInfo={trackInfo}  button="+" />
                }
            )
            setResultlistItems(resultCards);
        }

    }, [props.displayList])






    return (
        <div className={displayResultStyles.resultDisplayContainer}>
            <h1>Result</h1>
            <div className={displayResultStyles.resultListContainer}>
                {resultlistItems}
            </div>
        </div>
    );

}