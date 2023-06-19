import React, { useEffect, useState } from "react";
import axios from "axios";
import Donor from "./Donor";
import { AppBar, Box, Divider, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import useStyles from './styles';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useHistory } from "react-router-dom";


const Donors = ({id, bank}) =>{
    const navigate = useHistory();
    const classes = useStyles();
    const [donors, setDonors] = useState([]);
    const [count, setCount] = useState(0);
    const [bottles, setBottles] = useState(0);
    const [num, setNum] = useState(0);
    let remaining = 0;
    let key = 0;
    // const [bankName, setbankName] = useState("");

    // if(bank.length > 0){
    //     setbankName(bank);
    // }

   
    useEffect(()=>{

        axios.get(`http://localhost:3005/api/Donation//getDonors/${id}`, {
            headers:{
                accessToken2 : sessionStorage.getItem("accessToken2"),
            }
        }).then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
                
            }else{
                    console.log(response.data);
                    setDonors(response.data);
                    console.log(donors.length);
                    setCount(response.data.length);    
                       
                 }
                 
        })
        
    }, [id])

    // for finding the bottles that needed by the specific requirement 

    useEffect(()=>{

        axios.get(`http://localhost:3005/api/Request/myrequests/${id}`, {
            headers:{
                accessToken2 : sessionStorage.getItem("accessToken2"),
            }
        }).then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
                
            }else{
                    console.log(typeof(response.data[0].Qtyneed));
                    setBottles(response.data[0].Qtyneed);
                    
                }
                 
        })
    }, [id])

    return (

    <div>
            <div style={{marginTop:'40px',marginBottom:'30px', borderRadius:'5px', color:'black', height:'150px', width:'90%',textAlign:'center'}}>
     
                 <Typography variant="h5">{"ID: " + id}</Typography>
                 <Typography variant="h5">{"Total Donations: " + count}</Typography>
                 <Typography variant="h5">{"Qty need: " + (bottles - count)}</Typography>
                 <Typography variant="h5" style={{color : ((bottles-count)) ==0  ? 'green' : 'crimson' }}> Status:    {((bottles - count) == 0) ? 'Completed' : 'Not Completed' }</Typography>
                <Divider  style={{marginTop:'30px',marginLeft:'50px', backgroundColor:'crimson'}}/>
            </div>
   
        <Grid style={{marginTop:'30px'} }className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                             
        {
            donors.map((donor) => (
            <Grid key={donor?.cnic} item xs={12} sm={12} md={6} lg={3}>
             
              <Donor  id={donor?.req_id} cnic={donor?.cnic} count={count} bank={bank}/>
                    
                
            </Grid>
            ))
        }
        </Grid>
    </div>
    )
}

export default Donors;