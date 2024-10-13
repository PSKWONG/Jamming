import songDetailStyles from './SongDetail.module.css'

export function SongDetailContainer(props) {
    try{
        var {trackInfo} = props.trackDetail; 
    }catch(error){
        return <></>
    }

    
    const {action} = props.trackDetail; 
    const {setAction, setpendingTrackInfo} =action; 
    const {button} = props.trackDetail;
    const {preview, album, artist, trackID, trackName , trackURI , id  } = trackInfo;

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
            trackID,
            trackName,
            trackURI,
        })
    }

    return (
        <div className={songDetailStyles.songDetailContailer} key={id}>
            <div className={songDetailStyles.asctionButton} onClick={handleButtonAction} >
                <div className={songDetailStyles.sign}>{button}</div>
            </div>
            <h3>{trackName}</h3>
            <p>by <span className={songDetailStyles.singer}> {artist} </span> in  <span className={songDetailStyles.album}>{album} </span></p>
            <video key={id} controls={true} name="media" style={videoDisplayStyle} src={preview} sourcetype="audio/mpeg"></video>
        </div>
    )
}