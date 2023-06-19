import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {Avatar,Box, AppBar, Toolbar, IconButton,  Typography, Divider } from "@mui/material";
import {Link,useHistory} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Main from '../Main';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
  }
function PersonInfo (){

    const [requestList, setRequestList] = useState([])
    const [requestList2, setRequestList2] = useState([])
    const [requestList3, setRequestList3] = useState([])
    const navigate  = useHistory();
    const [profile, setProfile] = useState("");
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

    useEffect(()=>{
        axios.get('http://localhost:3005/api/Person/personinfo', {
            headers:{
                accessToken2 : sessionStorage.getItem("accessToken2"),
            }
        }).then((response)=>{
            if(response.data.error){
                toast.error('You are not authenticated to use this feature')
                
            }else{
            
           setRequestList(response.data);
           setProfile(response.data[0].file);
        //    console.log(requestList[0].loc_id);
                const show2 = ()=>{
                        axios.get('http://localhost:3005/api/Person/personcontact', {
                            headers:{
                                accessToken2 : sessionStorage.getItem("accessToken2"),
                            }
                        }).then((response)=>{
                            if(response.data.error){
                                toast.error('You are not authenticated to use this feature')
                                
                            }else{
                            
                           setRequestList2(response.data);

                           const show3= ()=>{
                            console.log(requestList[0].loc_id);
                            axios.get(`http://localhost:3005/api/Person/personLoc/${requestList[0].loc_id}`, {
                                headers:{
                                    accessToken2 : sessionStorage.getItem("accessToken2"),
                                }
                            }).then((response)=>{
                                if(response.data.error){
                                    toast.error('You are not authenticated to use this feature')
                                    
                                }else{
                                
                               setRequestList3(response.data);
                                }
                            })
                    }// show3 ends
                        show3()
                            }
                        })
                }// show2 ends
                show2()

        }
        })
    
    }, [])
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
        <Typography variant="h1" >Personal Details</Typography>
        
        </Toolbar>
       
    </AppBar> 
    

        <div>
           
        {
            requestList.map((val,key)=>{
                return (
                    
                    <div className="requests">
                      <Avatar style={{height:'100px', width:'100px'}} alt='Profile' src={profile}/>
                        
                        <div>
                            <div className="main">
                            <Typography variant="h4">Cnic : {val.cnic}</Typography>
                            <Typography variant="h4" id="reqid">Blood Group: {val.blood_group}</Typography>
                            </div>
                            <Divider/>
                            <Typography variant="h6">Name: {val.fname.toUpperCase() + " " + val.lname.toUpperCase()}</Typography>
                            <Typography variant="h6">Weight: {val.weight}</Typography>
                            <Typography variant="h6">no. of time donate: {val.frequencyDonation}</Typography>
                            <Typography variant="h6">IsDiabetes?: {val.IsDiabetes}</Typography>
                            <Typography variant="h6">IsHypetitus?: {val.IsHypetitus}</Typography>
                            {
                                requestList2.map((val2,key)=>{
                                    return(
                                            <Typography variant="h6">ContactNo{": " +val2.contactno}</Typography>
                                    );
                                })
                            }
                            {
                                requestList3.map((val3,key)=>{
                                    return(
                                            <Typography variant="h6">Location: {"Postal Code: " + val3.postalCode+" Area " + val3.Area + " , Block " + val3.Block + " , " + val3.City}</Typography>
                                    );
                                })
                            }
                        </div>

                    </div>
                );
            })
        }
       
        </div>
        </Box>
    );




}


export default PersonInfo;