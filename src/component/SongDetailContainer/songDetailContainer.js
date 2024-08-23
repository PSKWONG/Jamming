import React from "react";
import songDetailStyles from './SongDetail.module.css'

export function SongDetailContainer (props){

    const r = document.querySelector(':root');
    //Control the appearance of the media player 
        let videoDisplayStyle 
        if (props.button === "+"){
            
            videoDisplayStyle = {
                display : 'block'
            }
        }else if(props.button === "-"){
            videoDisplayStyle = {
                display : 'none'
            }
        }

    // Control the Button Action 
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
            <h3>{props.trackInfo.trackName}</h3>
            <p>by <span className={songDetailStyles.singer}> {props.trackInfo.artist} </span> in  <span className={songDetailStyles.album}>{props.trackInfo.album} </span></p>
            <video controls={true}  name="media" style = {videoDisplayStyle}><source src={props.trackInfo.preview} type="audio/mpeg" /></video>
        </div>
    )
}