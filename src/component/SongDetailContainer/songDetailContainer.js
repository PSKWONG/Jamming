import React ,{useEffect, useState} from "react";
import songDetailStyles from './SongDetail.module.css'

export function SongDetailContainer (props){

    function handleButtonAction (){
        if(props.button === "+"){
            props.setAction('Add')
        }else{
            props.setAction('Remove')
        }
        props.setpendingTrackInfo({
            album: props.trackInfo.album,
            artist: props.trackInfo.artist,
            trackID: props.trackInfo.trackID,
            trackName: props.trackInfo.trackName,
            trackURI: props.trackInfo.trackURI
        })
    }

    return (
        <div className={songDetailStyles.songDetailContailer} key={props.trackInfo.id}>
            <div className={songDetailStyles.asctionButton} onClick={handleButtonAction} >
                <div className={songDetailStyles.sign}>{props.button}</div>
            </div>
            <div className={songDetailStyles.singer} ></div>
            <h3>{props.trackInfo.trackName}</h3>
            by <span className={songDetailStyles.singer}> {props.trackInfo.artist} </span> in  <span className={songDetailStyles.album}>{props.trackInfo.album} </span>

        </div>
    )
}