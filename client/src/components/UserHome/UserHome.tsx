import  React,{useEffect, useState} from 'react';
import {styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Container, Grid, Grow, Paper} from '@mui/material'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import video from '../../assets/video.mp4';
import Avatar from '@mui/joy/Avatar';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LogoutIcon from '@mui/icons-material/Logout';
// import profile from '../../images/aman.jpg';
import axios from 'axios';
import {Buffer} from 'buffer';
import CreateRequest from '../Post/CreateRequest';
import ShowRequests from '../Post/ShowRequests';
import useStyles from './styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
      width,
      height,
  };
}

const UserHome = () => {

  const User = sessionStorage.getItem('accessToken2');
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = React.useState("");
  const [fname, setfName] = React.useState("");
  const [lname, setlName] = React.useState("");

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(()=>{
    if(User){
      axios.get("http://localhost:3005/api/Person/personinfo", {
            headers:{
                accessToken2: sessionStorage.getItem("accessToken2"),
            }
        }).then((response)=>{
          if(response.data){
             setProfile(response.data[0].file);
             setfName(response.data[0].fname);
             setlName(response.data[0].lname);
          }
            
        })

    }
  }, [User])
  useEffect(() => {
    function handleResize() {
        setWindowDimensions(getWindowDimensions());
        console.log(windowDimensions.width);
    }
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" open={open} style={{backgroundColor:'crimson', height:'70px'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Bloodu Donor/Needy
          </Typography>
         { User && (
          <div style={{ 
        position: "absolute", 
        top: "10px",
        right: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        }} >
         
          <Avatar alt='Profile' onClick={()=>{
          history.push('/myinfo')
        }} src={profile}/>
        <Typography style={{color:"white"}} variant='caption'>{fname.toUpperCase()} {lname.toUpperCase()} </Typography>
         
        </div>
      
        )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem  disablePadding>
              <ListItemButton onClick={()=>{
                  history.push("/")
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                  <HomeRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
            { !User && (
              <div>
            <ListItem  disablePadding>
              <ListItemButton onClick={()=>{
                  history.push("/registerP")
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                  <HowToRegIcon/>
                </ListItemIcon>
                <ListItemText primary='Register Account' />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding >
              <ListItemButton onClick={()=>{
                  history.push("/loginP")
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                  <LoginIcon/>
                </ListItemIcon>
                <ListItemText primary='Login'  />
              </ListItemButton>
            </ListItem>
            </div>
            )}

        {User && (
            <div>
              
            <ListItem  disablePadding>
              <ListItemButton onClick={()=>{
                  history.push("/posts")
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                <SelectAllIcon/>
                </ListItemIcon>
                <ListItemText primary='Posts' />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
              <ListItemButton onClick={()=>{
                  history.push("/myposts")
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                  <SelectAllIcon/>
                </ListItemIcon>
                <ListItemText primary='My Posts' />
              </ListItemButton>
            </ListItem>
            
            <ListItem  disablePadding>
              <ListItemButton onClick={()=>{
                  history.push("/donations")
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                  <VolunteerActivismIcon/>
                </ListItemIcon>
                <ListItemText primary='Donations' />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
              <ListItemButton onClick={()=>{
                sessionStorage.removeItem('accessToken2');
                history.push('/user');
              }}> 
                <ListItemIcon style={{color:'crimson'}}>
                  <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>

            </div>  
          )}
        </List>
        <Divider/>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
        {/* className={ classes.gridContainer } */}
        {!User &&(
          <div>
            <Container style={{ marginLeft: '0px', marginTop: '20px' }} >
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
            </div>
        )}

        {User && (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container 
                direction="column-reverse"
                    justifyContent="space-between"
                     alignItems="stretch" 
                     spacing={3}
                    >
                   

               <Paper className={classes.paper} style={{marginLeft: windowDimensions.width <= '850' ? '40px' : '400px', width: windowDimensions.width <= '850' ? '70%' : '50%' ,  height:'550px'}} elevation={10}>            
                    <CreateRequest profile={profile}/>
              </Paper>
              </Grid>
              </Container>
          </Grow>


       )}
         
           
     


      </Main>
    </Box>
  );
}
export default UserHome;