import React, {useState, useEffect} from "react";
import {Container, Typography } from '@mui/material';
import video from '../assets/video.mp4';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
  }

  
const Main = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
      );
    
      useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
            console.log(windowDimensions.width);
        }
      
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    return (

        <Container maxWidth='xl' style={{ marginTop: '40px', display: windowDimensions.width >= 1041 && 'flex', justify: windowDimensions.width >= 1041 && 'space-evenly' }}>
            <Container style={{ marginLeft: '0px', marginTop: '20px', height: windowDimensions.width >= 1041 && '500px', width: windowDimensions.width >= 1041 ? '500px' : '100%' }} >
                <video src={video} controls />
            </Container>
            <Container style={{ marginLeft: windowDimensions.width >= 1041 ? '100px' : '0px', marginTop: '50px' }}>
                <Typography variant='h3' style={{ fontFamily: 'Arial Nova' }}>
                    <em>
                        <q>
                            We Believe in Donations
                        </q>
                    </em>
                </Typography>
                <Typography style={{ marginTop: '5px', fontFamily: 'Arial Nova', fontSize: '20px' }}>
                    <em>
                        <q>
                            Blood Donation and Its Importance
                            Blood is the main reason we all are alive; the blood (RBC) carries oxygen from the lungs to all the parts of our body. The moment this process is hampered, a person’s life is in danger. That’s why during many accident cases, the victim dies due to excessive blood loss or brain haemorrhage.

                            That’s why sometimes you’ll notice that the hospital is asking the family of the patient to collect blood. If the proper amount of blood isn’t given to the patient’s body, then they might die. So people who donate blood not only do noble work but also save a person’s life when it’s needed.
                        </q>
                    </em>
                </Typography>
            </Container>

        </Container>

    )
}
export default Main;
