import React, {useEffect}  from 'react'; 
import displayResultStyles from './resultDisplay.module.css'


export function DisplayContainer (props) {

    useEffect (()=>{
        console.log (props.displayList)

    },[props.displayList])


    



    return (
        <div className={displayResultStyles.resultDisplayContainer}>
            <h1>Result</h1>
            <div className={displayResultStyles.resultListContainer}>
            </div>
        </div>
    );

}