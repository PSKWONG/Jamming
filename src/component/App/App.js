import React, { useEffect, useState } from 'react';

import './App.css';
import AppStyle from './AppContainer.module.css';

import Spotify from '../../API/Spotify';

import { getAccessToken, extractAccessToken } from '../../API/Spotify';

import { AuthenComponent } from '../Authentication/authenComponent';
import { HeaderComponent } from '../Header/headerComponent';
import { SearchingContainer } from '../Searching/SearchingComponent';



function App() {

  extractAccessToken(); 


  //Define the "Searching Value" for the App 
  const [inputValue, setInputValue] = useState('Input name of your favourite track /artist /album');

  const [authenStatus, setAuthenStatus] = useState(false)



  return (
    <div className={AppStyle.AppContainer}>
      <HeaderComponent />
      <AuthenComponent getAccessToken={getAccessToken} />
      <div className={AppStyle.functionContainer}>
        <SearchingContainer inputValue={inputValue} setInputValue={setInputValue} />
        <input type='input' ></input>

      </div>
    </div>
  );
}

export default App;
