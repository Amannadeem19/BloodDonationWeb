import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { AppBar, Box, ButtonBase, Card, CardContent, CardMedia, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
const  Donor = ({id,cnic, count, bank}) => {
    const classes = useStyles();
    const navigate = useHistory();
    const [person, setPerson] = useState({})
  useEffect(()=>{
    
    axios.get(`http://localhost:3005/api/Person/person/${cnic}`, {
        headers:{
            accessToken2 : sessionStorage.getItem("accessToken2"),
        }
    }).then((response)=>{
        if(response.data.error){
            console.log(response.data.error);            
        }else{
            console.log(response.data);
            setPerson(response.data[0]);
        }
    })
  }, [])
  
    return (
    
        <Card className={classes.card} raised elevation={6} >
 
          <CardMedia className={classes.media} image={person?.file} />
          <div className={classes.overlay}>
            <Typography variant='h6'>{person?.fname + " " + person?.lname}</Typography>
            <Typography variant='body2'>{"Blood Group: " + person?.blood_group}</Typography>
          </div>
         
          <Typography className={classes.title} variant='h5' gutterBottom>{"Weight: " + person?.weight}</Typography>
          
          {(bank.length > 0 )&& (
          <Typography className={classes.title} variant='h5' gutterBottom>{"Blood Bank: " + bank}</Typography>
          )}
          
          <Typography className={classes.title} variant='h5' gutterBottom>{"Donated to: " + id}</Typography>
          
        </Card>
         
  );
}

export default Donor;


{/* {(count  === 0) && (

            <div style={{display:'flex', marginTop:"30px", height:'100px', width:'100%'}}>
                <Typography variant="h3">{"No Donors  " + id}</Typography> 
                <span style={{marginLeft:'20px', marginTop:'5px'}} ><CircularProgress/></span>
            </div>
        )

        } */}
        
        // </div>