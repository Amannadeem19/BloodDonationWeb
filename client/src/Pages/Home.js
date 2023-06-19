import React from "react";
import video from '../assets/video.mp4'
// import axios from 'axios';
// import {useEffect} from "react";

function Home(){
    // use state use hoga yahan
    
    // useEffect(()=>{
      
    // }, [])
    return (
        <div id="video"> 
          <video src={video} autoPlay loop muted/>
        <div className="content">
            <h1>Welcome To</h1>
            <p>HemoBlood</p>
        </div>

        </div>

    )
}

export default Home;