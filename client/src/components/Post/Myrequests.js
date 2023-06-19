// this will return the current users posts 

import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import Post from "./PostDetail/Post";
import {CircularProgress,Box, AppBar, Grid, IconButton, Toolbar, Typography, Card, CardMedia, CardContent, CardActions, Button} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import useStyles from './styles';
import DeleteIcon from '@mui/icons-material/Delete';
function Myrequests(){
    // let history = useHistory()
   
    const [cnic, setCnic] = useState("");
    const [key, setKey] = useState(0);
    const classes = useStyles();
    const [requestList, setRequestList] = useState([])
    const navigate = useHistory();


    useEffect(() => {
        axios.get('http://localhost:3005/api/Person/personinfo', {
            headers: {
                accessToken2: sessionStorage.getItem("accessToken2"),
            }
        }).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);

            } else {
                setCnic(response.data[0].cnic)

            }
        })
    }, [])



    useEffect(()=>{
        axios.get("http://localhost:3005/api/Request/myrequests", {
            headers:{
                accessToken2: sessionStorage.getItem("accessToken2"),
            }
        }).then((response)=>{
            if(response.data.error){
                toast.error('You are not authenticated to use this feature')
            }if(response.data.err){
                toast.error('No post exist')
            }
            else if(response.data){
                console.log(response.data);
                setRequestList(response.data)
            }
        })

    }, [key])  // inner function ends 
    
    return (

        <Box  sx={{ flexGrow: 1 }}>
   
    <AppBar style={{backgroundColor:'crimson'}} position="static">
    
      <Toolbar>
      <IconButton
          size="large"
          edge="false"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2  }}
          onClick={()=>{
            navigate.push('/user');
          }}
       
        >
          <HomeRoundedIcon style={{height:'50px', width:'50px'}} />
        </IconButton>
        <Typography variant="h1" >My Posts</Typography>
        
        </Toolbar>
       
    </AppBar> 

    
        {(requestList.length === 0) &&(
            <div style={{display:'flex', marginTop:"30px"}}>
                <Typography variant="h3">No Post Found</Typography> 
                <span style={{marginLeft:'20px', marginTop:'5px'}} ><CircularProgress/></span>
            
            </div>
        )}
        {requestList &&(

        
        <Grid item xs={12} sm={6} md={9}>

            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>

                {
                    requestList.map((post) => (

                        <Grid key={post?.req_id} item xs={12} sm={12} md={6} lg={3}>
                            <Card className={classes.card} raised elevation={6}>
                                <CardMedia className={classes.media} image={post?.profile} />
                                <div className={classes.overlay}>
                                    <Typography variant='h6'>ID: {post?.req_id}</Typography>
                                    <Typography variant='body2'>Posted: {post?.Time}</Typography>

                                </div>
                                <div style={{ marginLeft: '20px' }}>
                                    <Typography variant='h6' gutterBottom>Group: {post?.bloodGroup}</Typography>
                                    <Typography variant='h6' gutterBottom>Bottles Needed: {post?.Qtyneed}</Typography>
                                    <Typography variant='h6' gutterBottom>Time Period: {post?.TimePeriod} days</Typography>
                                </div>
                                <CardContent>
                                    <Typography variant='body2' color="textSecondary" >Message: {post?.Reason}</Typography>


                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    {(cnic === Number(post?.cnic)) && (

                                        <Button size='small' color='primary' onClick={() => {

                                            axios.delete(`http://localhost:3005/api/Request/delete/${post?.req_id}`, {
                                                headers: {
                                                    accessToken2: sessionStorage.getItem("accessToken2"),
                                                }
                                            }).then((response) => {
                                                if (response.data.error) {
                                                    console.log(response.data.error);
                                                } else {
                                                    console.log("deleted successfully");
                                                    setKey(key+1);
                                                }
                                            })
                                        }}>
                                            <DeleteIcon fontSize='medium' />
                                            Delete
                                        </Button>

                                    )}

                                </CardActions>

                            </Card>
                        </Grid>
                    )
                    )
                }
            </Grid>
        </Grid>
        )}
       </Box>
    );


}

export default Myrequests;
