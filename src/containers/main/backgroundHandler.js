import {useState, useEffect, useMemo} from 'react';

//Import background Image 
import pinkBackground from '../../component/main/images/pink_background.jpg'
import greenBackground from '../../component/main/images/green_background.webp';
import redBackground from '../../component/main/images/red_background.jpg';         
import yellowBackground from '../../component/main/images/yellow_background.webp';


// PageState is a custom hook that manages the state of the page
const useSetPageBackground = ()=>{
    
    //Array of background images (memoized)
    const backgroundImages = useMemo(() => [
        yellowBackground,
        pinkBackground,
        greenBackground,
        redBackground
    ], []);

    //State for the display list
    const [background, setBackground] = useState(backgroundImages[0]);


    //Function to change the background based on the page
   
    useEffect(() => {
        //Get a random number base on the length of the background images array
        let randomNum = Math.floor(Math.random() * backgroundImages.length);
        //Set the background state to the random number
        setBackground(backgroundImages[randomNum]);

    },[backgroundImages]);

    useEffect(() => {
       
        //Set the CSS variable for the background image
        document.documentElement.style.setProperty('--backgroundImg', `url(${background})`);

    },[background]);

}

export default useSetPageBackground;