import React, {useEffect} from 'react';
import userResultStyles from './userDisplayList.module.css'
import { SongDetailContainer } from '../SongDetailContainer/songDetailContainer';

export function UsertDisplayContainer(props) {


    function resetPlayListName() {
        props.setPlaylistName('');
    }

    function handleInputBox(event) {
        props.setPlaylistName(event.target.value);
    }

    function handleInputFocusOut(event) {
        if (!event.target.value) {
            props.setPlaylistName('New Playlist')
        }
    }

    //Control the appearance of the container
    var r = document.querySelector(':root');

    //Track Display List is generated by the Search result by mapping  
    let resultlistItems
    if (props.playlistTracks.length !== 0) {

        r.style.setProperty('--containerState', 'visible');

        resultlistItems = props.playlistTracks.map(
            (trackInfo) => {
                return <SongDetailContainer trackInfo={trackInfo} setAction={props.setAction} setpendingTrackInfo={props.setpendingTrackInfo} button="-" />
            }
        )
    }else{
        r.style.setProperty('--containerState', 'hidden');
    }



    return (
        <div className={userResultStyles.userDisplayContainer}>
            <input type='text' className={userResultStyles.titleInput} value={props.playlistName} onChange={handleInputBox} onClick={resetPlayListName} onBlur={handleInputFocusOut}></input>

            <div className={userResultStyles.userListContainer}>
                {resultlistItems}
            </div>
            <input className={userResultStyles.exportButton} type='submit' value="Export to Spotify" onClick={props.handleExportBtn} ></input>
        </div>
    );
}

