import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Alert, Stack,Button,  AppBar, Toolbar, Box, IconButton, Container, Typography, TextField} from '@mui/material';
import { useHistory, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import myimage from '../../images/donationImage.png';
import {red} from '@mui/material/colors';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
 
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function LoginP() {
    console.log("login main me aya");
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");
    const [alert , setAlert] = useState(false);
    const [alertdata, setAlertdata] = useState("");
    let history = useHistory();
    

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
    const login = () => {
       

        const data = { cnic: cnic, password: password }
        console.log(data);
        if (!data.cnic || !data.password) {
            setAlertdata('Please provide email or password')
            setAlert(true);
        }
        axios.post("http://localhost:3005/api/authPerson/LoginP", data).then((response) => {
            if (response.data.error) {
                setAlertdata(response.data.error);
                setAlert(true);
        
            } else {
                console.log(response.data)
                toast.success('Successfully logged in')
                sessionStorage.setItem("accessToken2", response.data)
                // after login go to user access functionalities page 
                history.push("/user")
            }

        })
    }
    const handleScroll = () => {
        const targetPosition = 500;
        window.scrollTo({top: targetPosition, behavior: "smooth"});
    }
    return (


        <Box sx={{ flexGrow: 1 }}>

            <AppBar style={{ backgroundColor: 'crimson' }} position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                    
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            history.push('/user');
                        }}
                
                    >
                        <HomeRoundedIcon />
                    </IconButton>
                        <Typography variant="h4">
                            Bloodu Login
                        </Typography>
                    </Toolbar>
            </AppBar>
            <Container  style={{display: windowDimensions.width >= 850 && 'flex', justifyContent:  windowDimensions.width >= 850 && 'space-evenly'}}>
        <div style={{position:'relative'}}>
        <img style={{ marginRight:'40px', marginTop:'20px', width:  windowDimensions.width >= 850 ? 'auto' : '100%', height: windowDimensions.width >= 850 ? '500px' : '700px'}} src={myimage} alt="donation" />
        </div>                
        {windowDimensions.width <= 850 && (
                   <IconButton style={{ position: "absolute", top: 580, right: 0, zIndex: 1}} onClick={handleScroll}>
                    <KeyboardDoubleArrowDownIcon style={{height:'50px', width:'50px'}} />
                    </IconButton>
                   
                )}
            <div style={{marginTop: '50px', marginLeft:'100px' }}>
            {alert && (
               
                    <Stack sx={{width:'100%', marginBottom:'20px'}}>
                    <Alert onClose={()=>{
                        setAlert(false);
                        setAlertdata("");
                        history.push('/loginP');
                    }} severity="error">{alertdata}</Alert>
                    </Stack>
                 )}

                <TextField
                    style={{height:'100px', width:'500px'}}
                    name="cnic"
                    variant="outlined"
                    label="CNIC"
                    fullWidth
                    onChange={(e)=>setCnic(e.target.value)}

                />

                <TextField
                    style={{height:'100px', width:'500px'}}
                    name="password"
                    variant="outlined"
                    label="Password"
                    fullWidth
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}

                />
               
                
                
              
                <Button  variant="contained" style={{marginTop:'10px',marginRight:'80px', backgroundColor: red[700]}} onClick={login}>Login</Button>
          
                </div>
    </Container>
    
    </Box> 
    
    )
}

export default LoginP;