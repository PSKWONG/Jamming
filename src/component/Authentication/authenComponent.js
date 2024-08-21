import React, {useState} from 'react';
import Style from './authen.module.css';
import { checkAccessToken } from '../../API/Spotify';



export function AuthenComponent (props){

    

    function handleOnClick () {
        props.getAccessToken();
        console.log('Authentication button is clicked')
    }


    return (
        <div className={Style.authenContainer} >
            <h1 className={Style.authenTitle}> Authentication</h1>
            <p>Welcome to Edward's Music Jamming Programme.</p>
            <p> Before using the site, user authentication of Spotify is needed. Please press the button below to proceed. </p>
            <input type='submit' className={Style.authenbutton} value='Authenticate' onClick={handleOnClick}></input>
        </div>

    )
}