import React, { useEffect, useState } from 'react';

import './App.css';
import AppStyle from './AppContainer.module.css';

import { getAccessToken, extractAccessToken, checkAccessToken, getSearchresult } from '../../API/Spotify';

import { AuthenComponent } from '../Authentication/authenComponent';
import { HeaderComponent } from '../Header/headerComponent';
import { SearchingContainer } from '../Searching/SearchingComponent';
import { DisplayContainer } from '../DisplayContainer/DisplayContainer';
import { UsertDisplayContainer } from '../UserListContainer/userDisplayListContainer';



function App() {

  extractAccessToken();

  //Control the display of Components ========================================================
  var r = document.querySelector(':root');

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

  // Action taken after pressing the + / - button 
  useEffect(() => {

    
    if (actionOnList === 'Add') { // Add Track into user track list 

      //Check repeating check 
      let RepeatedChecking = playlistTracks.filter((track) => track.trackID === pendingTrackInfo.trackID)
      if (RepeatedChecking.length == 0) {
        console.log('Adding Track is triggered')
        setPlaylistTracks(
          (pre) => ([pendingTrackInfo, ...pre])
        )
      } else {
        alert('Track already Exist in your playlist')
      }

    } else if (actionOnList === "Remove") {// Remove Track from user track list 
      let RenewedUserPlayList = playlistTracks.filter((track) => track.trackID !== pendingTrackInfo.trackID)
      setPlaylistTracks (RenewedUserPlayList)
    }

  }, [pendingTrackInfo])






  //"Searching Function" for the App =============================================================
  const [inputValue, setInputValue] = useState('Input name of your favourite track /artist /album');

  function handleSearchingBtn(event) {
    event.preventDefault()
    //console.log('Searching button is triggered')
    getSearchresult(inputValue)
      .then(
        (resp) => {
          setDisplayList(resp);
        }
      )
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
        <UsertDisplayContainer playlistName={playlistName} setPlaylistName={setPlaylistName} playlistTracks={playlistTracks} setAction={setAction} setpendingTrackInfo={setpendingTrackInfo} />

      </div>
    </div>
  );
}

export default App;
