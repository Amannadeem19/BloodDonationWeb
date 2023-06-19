import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import useStyles from './styles'
import DeleteIcon from '@mui/icons-material/Delete';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Donors from "../Donate/Donors";
const ShowRequests = () => {
    const classes = useStyles();
    const navigate = useHistory();
    const [cnic, setCnic] = useState("");
    const [key, setKey] = useState(0);
    const [requestList, setRequestList] = useState([]);
    const[bankNameList, setBankNameList] = useState([])
    const [donor, setDonor] = useState(false);
    const[dataset, setData] = useState("")
    const user = sessionStorage.getItem('profile');
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

        axios.get('http://localhost:3005/api/Donation/donate', {
            headers:{
                accessToken2: sessionStorage.getItem('accessToken2'),
            }
        }).then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
               
            }else{
                console.log(response.data);
                setBankNameList(response.data)
                // toast.success(response.data)
            }
            
        })

    }, [])


    useEffect(() => {
        axios.get('http://localhost:3005/api/Request/requests', {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
               console.log(response.data.error);

            } else {

                setRequestList(response.data);
            }
        })
        console.log(requestList);
    }, [key])   

    const handleChange = (event)=>{           
        setData(event.target.value)
 }
 
    return (

        <Box  sx={{ flexGrow: 1 }}>
   
        <AppBar style={{backgroundColor:'crimson'}} position="static">
        
          <Toolbar>
          <IconButton 
              size="large"
              edge="false"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={()=>{
                navigate.push('/user');
              }}
           
            >
              <HomeRoundedIcon style={{height:'50px', width:'50px'}}/>
            </IconButton>
            <Typography variant="h1" >Blood Requests</Typography>
            
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
                                {(cnic !== Number(post?.cnic)) && (
                                <div style={{marginTop:'20px', marginLeft:'30px'}}>
                                    <select style={{height:'40px', width:'70%'}}  value={dataset.bankName} onChange={handleChange}>
                                    <option value="" >Choose Blood Bank</option>
                                    { 
                                        bankNameList.map((val, key)=>{
                                        return(
                                            <option value={val.BankName} > {val.BankName}</option>
                                        )
                                        }
                                        )
                                    }                        
                                </select>
                            
                                </div>
                                )}

                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    {/* for deleting the table */}
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

                                      {/* for donating    */}
                                      {(cnic !== Number(post?.cnic)) && (

                                    <Button size='small' color='primary' onClick={()=>{
                                        
                                        axios.post('http://localhost:3005/api/Donation/postdonate',{
                                            bankName: dataset, // bankname
                                            req_id : post?.req_id,
                                            bloodGroup: post?.bloodGroup,
                                        },{
                                            headers:{
                                                accessToken2: sessionStorage.getItem('accessToken2'),
                                            }
                                        }).then((response)=>{
                                            if(response.data.error){
                                                console.log(response.data.error);
                                            }if(response.data.req_error){
                                                console.log(response.data.req_error);
                                            }
                                            else if(response.data){
                                                console.log('donate success');
                                                
                                            }
                                        })
                                        
                                     
                                    }}>
                                        <BloodtypeIcon fontSize='medium' />
                                         Donate Now
                                    </Button>

                                    )}
                                    

                                {/* <Button size='small' color='primary' onClick={()=>{
                                    setDonor(true);
                                }}>
                                        <AccessibilityIcon fontSize='medium' />
                                         Donors
                                    </Button> 
                                    {donor && (
                                        <Grid key={post?.req_id} item xs={12} sm={12} md={6} lg={3}>
                                        <Donors id={post?.req_id} bank={""}/>
                                        </Grid>
                                    )} */}
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
    )
};

export default ShowRequests;