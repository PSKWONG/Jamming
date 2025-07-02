import React, { useEffect, useState } from 'react';

import '../../style/Page.css';
import AppStyle from './Page.module.css';

import { HeaderComponent } from '../header/HeaderComponent';
import { SearchingContainer } from '../searching/SearchingComponent';
import { SearchDisplay } from '../searching/SearchResult'
import { UsertDisplayContainer } from '../userListContainer/UserDisplayListContainer';
import SystemMessage from '../systemMessage/SystemMessage';



function Page(props) {

  //Variable to control components
  const {isPublicAccessToken} = props.accessToken;
  const {searchResult} = props

  return (
    <div className={AppStyle.AppContainer}>
      <HeaderComponent />
      <div className = {AppStyle.ContentContainer}>
        <SystemMessage accessToken = {props.accessToken} />

        {isPublicAccessToken && 
          <SearchingContainer 
            searchingControl = {props.searchingControl} 
            searchResult = {searchResult} 
            storeActions = {props.storeActions}  
          />
        }
        
        {isPublicAccessToken &&  
          <UsertDisplayContainer 
          storeTrack={props.storeTrack} 
          listTitle={props.listTitle} 
          storeActions = {props.storeActions} 
          />
        }
    
      </div>
    </div>
  );
}

export default Page;


