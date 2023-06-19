import React, { startTransition, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import {Typography, TextField, Container, Button, Toolbar, Box, AppBar, IconButton } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import myimage from '../../images/donationImage.png';
import {red} from '@mui/material/colors';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    }
}

function Login() {
    const [bankName, setBankName] = useState("");
    const [password, setPassword] = useState("");
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [])
    let history = useHistory();


    const login = () => {
        const data = { BankName: bankName, password: password }
        if (!data.BankName || !data.password) {
            toast.error('Please Provide each field')
        } else {
            axios.post("http://localhost:3005/api/authBank/login", data).then((response) => {
                if (response.data.error) {

                    // history.push("/Error")
                    toast.error('Please enter a valid credentials')
                    function start() {
                        const timeoutStart = setTimeout(() => {
                            history.push("/login")
                        }, 3000)
                    }
                    start()
                } else {
                    console.log(response.data)
                    sessionStorage.setItem("accessToken", response.data);
                    history.push("/")


                }

            })
        }
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
                            history.push('/bloodbank');
                        }}

                    >
                        <HomeRoundedIcon />
                    </IconButton>
                    <Typography variant="h4">
                        Bloodu Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ display: windowDimensions.width >= 850 && 'flex', justifyContent: windowDimensions.width >= 850 && 'space-evenly' }}>
                <div style={{position:'relative'}}>
                <img style={{ marginRight: '40px', marginTop: '20px', width: windowDimensions.width >= 850 ? 'auto' : '100%', height: windowDimensions.width >= 850 ? '500px' : '700px' }} src={myimage} alt="donation" />
                </div>
                
                {windowDimensions.width <= 850 && (
                   <IconButton style={{ position: "absolute", top: 580, right: 0, zIndex: 1}} onClick={handleScroll}>
                    <KeyboardDoubleArrowDownIcon style={{height:'50px', width:'50px'}} />
                    </IconButton>
                   
                )}        

                <div style={{ marginTop: '50px', marginLeft: '100px' }}>
                    <TextField
                        style={{ height: '100px', width: '500px' }}
                        name="bank"
                        variant="outlined"
                        label="Bank Name"
                        fullWidth
                        type="text"
                        onChange={(e) => setBankName(e.target.value)}

                    />

                    <TextField
                        style={{ height: '100px', width: '500px' }}
                        name="password"
                        variant="outlined"
                        label="Password"
                        fullWidth
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <Button variant="contained" style={{ marginTop: '10px', marginRight: '80px', backgroundColor: red[700] }} onClick={login}>Login</Button>

                </div>
            </Container>
        </Box>
    );
}

export default Login;