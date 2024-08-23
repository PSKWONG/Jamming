import React, { useEffect } from "react";
import songDetailStyles from './SongDetail.module.css'

export function SongDetailContainer(props) {



    let videoDisplayStyle
    if (props.button === "+" && props.trackInfo.preview) {

        videoDisplayStyle = {
            display: 'block'
        }
    } else {
        videoDisplayStyle = {
            display: 'none'
        }
    }

    // Control the Button Action 
    function handleButtonAction() {
        if (props.button === "+") {
            props.setAction('Add')
        } else {
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
            <video key={props.trackInfo.id} controls={true} name="media" style={videoDisplayStyle} src={props.trackInfo.preview} sourcetype="audio/mpeg"></video>
        </div>
    )
}