import React, { useEffect, useState } from 'react';

import './App.css';
import AppStyle from './AppContainer.module.css';

import { getAccessToken, extractAccessToken, checkAccessToken, getSearchresult, exportPlaylist } from '../../API/Spotify';

import { AuthenComponent } from '../Authentication/authenComponent';
import { HeaderComponent } from '../Header/headerComponent';
import { SearchingContainer } from '../Searching/SearchingComponent';
import { DisplayContainer } from '../DisplayContainer/DisplayContainer';
import { UsertDisplayContainer } from '../UserListContainer/userDisplayListContainer';



function App() {

  extractAccessToken();

  var r = document.querySelector(':root');
  //Control the background of the APP ========================================================
  
  useEffect(() => {
    let randomNum = Math.floor(Math.random() * 4)
    console.log(randomNum)
    switch (randomNum) {
      case 0:
        console.log('option 0 ')
        r.style.setProperty('--backgroundImg', 'url(../../../images/pink_background.jpg)');
        break;
      case 1:
        r.style.setProperty('--backgroundImg', 'url(../../../images/green_background.webp)');
        break;
      case 2:
        r.style.setProperty('--backgroundImg', 'url(../../../images/red_background.jpg)');
        break;
      case 3:
        r.style.setProperty('--backgroundImg', 'url(../../../images/yellow_background.webp)');
        break;
      default:
        r.style.setProperty('--backgroundImg', 'url(../../../images/yellow_background.webp)');
        break;
    }

  }, [r.style])

  //Control the display of Components ========================================================

  if (checkAccessToken()) {
    //Set the display property of the container 
    r.style.setProperty('--authenticatorState', 'none');
    r.style.setProperty('--appContainerState', 'flex');

  } else {
    r.style.setProperty('--authenticatorState', 'block');
    r.style.setProperty('--appContainerState', 'none');
  }

  //Song List to display ========================================================
  const [displayList, setDisplayList] = useState([])

  // User Defined PlayList ========================================================
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [actionOnList, setAction] = useState('');
  const [pendingTrackInfo, setpendingTrackInfo] = useState('')
  //const [alertMsgState, setAlertMsgState] = useState(false)

  // Action taken after pressing the + / - button
  let RepeatedChecking = playlistTracks.filter((track) => track.trackID === pendingTrackInfo.trackID);
  let RenewedUserPlayList = playlistTracks.filter((track) => track.trackID !== pendingTrackInfo.trackID)


  useEffect(() => {

    if (actionOnList === 'Add') { // Add Track into user track list 

      //Check repeating check 

      if (RepeatedChecking.length === 0) {
        setPlaylistTracks(
          (pre) => ([pendingTrackInfo, ...pre])
        )
      } else {
        //alert('Track already Exist in your playlist')
        //setAlertMsgState(true)
      }

    } else if (actionOnList === "Remove") {// Remove Track from user track list 

      setPlaylistTracks(RenewedUserPlayList)
    }

    return setAction('')

  }, [pendingTrackInfo, actionOnList, RepeatedChecking, RenewedUserPlayList])


  // Convert the userplaylist into a URI list 
  const [uriList, setURIList] = useState([])
  useEffect(() => {

    if (playlistTracks.length !== 0) {
      const conversionList = playlistTracks.map((trackinfo) => {
        return trackinfo.trackURI
      })

      setURIList(conversionList)
    }


  }, [playlistTracks])




  //"Searching Function" for the App =============================================================
  const [inputValue, setInputValue] = useState('Input name of your favourite track /artist /album');

  function handleSearchingBtn(event) {
    event.preventDefault()
    getSearchresult(inputValue)
      .then(
        (resp) => {
          setDisplayList(resp);
        }
      )
  }

  //Export playlist to Spotify =============================================================
  function handleExportBtn(event) {
    event.preventDefault();
    if (uriList.length !== 0) {
      exportPlaylist(playlistName, uriList)
      alert('Tracks are successfully added')
      setPlaylistTracks([]);
      setPlaylistName('New Playlist');

    } else {
      alert('Please add track to the list')
    }

  }







  return (
    <div className={AppStyle.AppContainer}>
      <HeaderComponent />
      <div className={AppStyle.AuthenticatorContainer}>
        <AuthenComponent getAccessToken={getAccessToken} />
      </div>
      <div className={AppStyle.functionContainer}>
        <SearchingContainer inputValue={inputValue} setInputValue={setInputValue} handleSearchingBtn={handleSearchingBtn} />
        <DisplayContainer displayList={displayList} setAction={setAction} setpendingTrackInfo={setpendingTrackInfo} />
        <UsertDisplayContainer playlistName={playlistName} setPlaylistName={setPlaylistName} playlistTracks={playlistTracks}
          setAction={setAction} setpendingTrackInfo={setpendingTrackInfo} handleExportBtn={handleExportBtn} />

      </div>
    </div>
  );
}

export default App;
