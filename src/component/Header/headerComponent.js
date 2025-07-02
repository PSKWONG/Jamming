import React from'react'; 
import headerStyle from './Header.module.css'

function HeaderComponent () {

    return (
        <div className= {headerStyle.headerContainer}>
            <h1> Jamming </h1>
        </div>
    );

}

export default HeaderComponent; 