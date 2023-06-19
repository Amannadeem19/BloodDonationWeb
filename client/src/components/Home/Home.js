import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar,Box , Button} from '@mui/material'
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import useStyles from './styles';
import Main from '../Main';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
      width,
      height,
  };
}

const Home = ()=>{
  const classes = useStyles();
  const navigate  = useHistory();


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
    <Box  sx={{ flexGrow: 1 }}>
   
    <AppBar style={{backgroundColor:'crimson'}} position="static">
    
      <Toolbar className={classes.toolbar}>
      <IconButton
          size="large"
          edge="false"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={()=>{
            navigate.push('/');
          }}
          className={classes.home}
        >
          <HomeRoundedIcon style={{height:'50px', width:'50px'}} />
        </IconButton>
        <Button style={{marginLeft: windowDimensions.width <= 1058 ? '40px' : '250px', textDecoration: 'underline', fontSize:'20px'}} component={Link} to='/bloodbank' color="inherit" > Blood Bank?</Button>
        <Button style={{marginLeft: windowDimensions.width <= 1058 ? '40px' : '250px', textDecoration: 'underline',fontSize:'20px'}} component={Link} to='/user' color="inherit" >Donor or Needy?</Button>
        </Toolbar>
    </AppBar> 

    <Main/>
    
    </Box>
  )
}

export default Home;