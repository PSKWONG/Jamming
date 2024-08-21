import React, { useEffect, useState } from 'react';

import './App.css';
import AppStyle from './AppContainer.module.css';

import { getAccessToken, extractAccessToken , checkAccessToken, getSearchresult} from '../../API/Spotify';

import { AuthenComponent } from '../Authentication/authenComponent';
import { HeaderComponent } from '../Header/headerComponent';
import { SearchingContainer } from '../Searching/SearchingComponent';
import { DisplayContainer } from '../DisplayContainer/DisplayContainer';



function App() {

  extractAccessToken();

  //Control the display of Components ========================================================
  var r = document.querySelector(':root');

    if (checkAccessToken()){
        //Set the display property of the container 
        r.style.setProperty('--authenticatorState', 'none');
        r.style.setProperty('--appContainerState', 'flex');

    }else{
        r.style.setProperty('--authenticatorState', 'block');
        r.style.setProperty('--appContainerState', 'none');
    }

  // Song List Display 

  const [displayList, setDisplayList]  = useState([])


  //"Searching Function" for the App =============================================================
  const [inputValue, setInputValue] = useState('Input name of your favourite track /artist /album');

  function handleSearchingBtn(event){
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
        <SearchingContainer inputValue={inputValue} setInputValue={setInputValue} handleSearchingBtn={handleSearchingBtn}/>
        <DisplayContainer displayList={displayList} />

      </div>
    </div>
  );
}

export default App;
