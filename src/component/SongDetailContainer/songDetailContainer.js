import React ,{useEffect, useState} from "react";
import songDetailStyles from './SongDetail.module.css'

export function SongDetailContainer (props){


    return (
        <div className={songDetailStyles.songDetailContailer} key={props.trackInfo.id}>
            <div className={songDetailStyles.asctionButton}  >
                <div className={songDetailStyles.sign}>{props.button}</div>
            </div>
            <div className={songDetailStyles.singer} ></div>
            <h3>{props.trackInfo.trackName}</h3>
            by <span className={songDetailStyles.singer}> {props.trackInfo.artist} </span> in  <span className={songDetailStyles.album}>{props.trackInfo.album} </span>

        </div>
    )
}