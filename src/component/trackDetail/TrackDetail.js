import styles from './trackDetail.module.css';

export function SongDetail(props) {

    const {id, trackDetail, action} = props; 

    //Exapnd Details of Track
    const {album,artist, trackName, preview } = trackDetail; 

    //Icon of button 
    const btnIcon = action[0] ==="add"? "+" : "-"; 

    //Action for button 
    const btnAction = action[1]; 
    const handleBtnAction = (e)=>{
        e.preventDefault(); 
        btnAction(id, trackDetail); 
    }

    //Conditional Content for preview 
    let previewContent; 
    if( preview != null){
        previewContent = <video key={id} controls={true} name="media" src={preview} sourcetype="audio/mpeg"></video>
    }else{
        previewContent = <></>
    }


    return (
        <div className={styles.songDetailWrapper} key={id}>
            <div className = {styles.songDetailContailer}>
                <h3>{trackName}</h3>
                <p>by <span className={styles.singer}> {artist} </span> in  <span className={styles.album}>{album} </span></p>
                {previewContent}
            </div>
            <div className={styles.actionButton} onClick={handleBtnAction} >
                <div className={styles.sign}> {btnIcon} </div>
            </div>
        </div>
    )
}
