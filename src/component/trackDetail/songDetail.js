import styles from './SongDetail.module.css'

export function SongDetail(props) {

    const {id, trackDetail, action} = props; 

    //Exapnd Details of Track
    const {album,artist, trackName, preview } = trackDetail; 

    //Icon of button 
    const icon = action[0] ==="add"? "+" : "-"; 

/*
    try{
        var {trackInfo} = props.trackDetail; 
    }catch(error){
        return <></>
    }

    
    const {action} = props.trackDetail; 
    const {setAction, setpendingTrackInfo} =action; 
    const {button} = props.trackDetail;
    //const {preview, album, artist, trackID, trackName , trackURI , id  } = trackInfo;

    let videoDisplayStyle

    if (button === "+" && preview) {

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
        if (button === "+") {
            setAction('Add')
        } else {
            setAction('Remove')
        }
        setpendingTrackInfo({
            album,
            artist,
            trackName,
        })
    }

    */
    return (
        <div className={styles.songDetailContailer} key={id}>
            <div className={styles.asctionButton} >
                <div className={styles.sign}> {icon} </div>
            </div>
            <h3>{trackName}</h3>
            <p>by <span className={styles.singer}> {artist} </span> in  <span className={styles.album}>{album} </span></p>
        </div>
    )
}

/*
            <video key={key} controls={true} name="media" src={preview} sourcetype="audio/mpeg"></video>
*/