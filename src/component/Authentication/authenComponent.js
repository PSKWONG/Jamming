import React, {useState} from 'react';
import Style from './authen.module.css';
import { checkAccessToken } from '../../API/Spotify';



export function AuthenComponent (props){

    var r = document.querySelector(':root');

    if (checkAccessToken()){
        //Set the display property of the container 
        r.style.setProperty('--authenticatorState', 'none');
        console.log('Authentication status is disabled')
    }else{
        r.style.setProperty('--authenticatorState', 'block');
        console.log('Authentication status is enable')
    }

    

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