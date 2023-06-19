import React, { useState , useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Donors from "./Donors";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useHistory } from "react-router-dom";


function GetDonations (){
    const [donors, setDonors] = useState([]);
    const navigate = useHistory();
   

    useEffect(()=>{
        axios.get('http://localhost:3005/api/Donation/getDonations', {
            headers:{
                accessToken2 : sessionStorage.getItem("accessToken2"),
            }
        }).then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
                
            }else{
                    console.log(response.data);
                    setDonors(response.data);
           
                 }
        })
        
    },[])

   
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
            <Typography variant="h3" >Donors</Typography>
            
            </Toolbar>
           
        </AppBar> 
       
        {
            donors.map((donor)=>(
                    <div key={donor?.req_id}>
                            <Donors id={donor?.req_id} bank={donor?.bankName}/>
                    </div>
            ))
        }
        </Box>
        
    );




}

export default GetDonations;
