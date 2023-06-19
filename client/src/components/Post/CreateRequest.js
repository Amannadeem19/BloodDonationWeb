import React,{useState} from "react";
import axios from 'axios'
import useStyles from './styles';
import { TextField, Typography, Button, Paper, Stack, Alert} from "@mui/material";
import {useHistory} from 'react-router-dom';

const CreateRequest = ({profile})=>{
  
    const url = profile;
    const classes  = useStyles();
    const history = useHistory();
    const user =  sessionStorage.getItem('profile');
    const [postData, setPostData] = useState({
        bloodGroup:"",
        QtyNeed:"",
        Reason:"",
        timePeriod:"",  
        profile:"",
    })
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState("");


    // {cnic : cnic, bloodGroup: bloodGroup, QtyNeed: QtyNeed, Date : Date, Time : Time, TimePeriod : TimePeriod, Reason : Reason 
    const handleSubmit = (e)=>{
        e.preventDefault();


        // if creating a post 
        postData.profile = url;
        console.log(postData);
    
        axios.post('http://localhost:3005/api/Request/create', postData,{
            headers:{
                accessToken2 : sessionStorage.getItem('accessToken2'),
            }
        }).then((response)=>{
            if(response.data.error){
                setAlert(true);
                setAlertData(response.data.error);
            }else{
            console.log(response.data);
                clear();
                history.push('/user');
            }
        })
        clear();

    }
    const clear = () =>{
        setPostData({
            bloodGroup : "",
            timePeriod : "",
            QtyNeed:"",
            Reason:"",
            profile:"",
        })
    }
    return (

        

        <div>
             {alert && (
               <div>
               <Stack sx={{width:'100%', marginBottom:'20px'}}>
               <Alert onClose={()=>{
                   setAlert(false);
                   setAlertData("");
               }} severity="error">{alertData}
               </Alert>
               </Stack>
               </div>
           )}
       
           
            <form autoComplete="off" validate="true" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            {/* {user ? 'Editing' : 'Creating'} a Post */}
            <Typography variant="h6">Creating a Post</Typography>
            <TextField
            name="bloodGroup"
            variant="outlined"
            fullWidth
            label="Blood Group"
            required
            value={postData.bloodGroup}
            onChange={(e) => setPostData({...postData, bloodGroup: e.target.value})}
            
            />

        <TextField
            name="timePeriod"
            variant="outlined"
            fullWidth
            label="Time Period (days)"
            required
            value={postData.timePeriod}
            onChange={(e) => setPostData({...postData, timePeriod: e.target.value})}
            
            />

        <TextField
            name="QtyNeed"
            variant="outlined"
            fullWidth
            label="Quantity Need"
            required
            value={postData.QtyNeed}
            onChange={(e) => setPostData({...postData, QtyNeed: e.target.value})}
            
            />

        <TextField
            name="Reason"
            variant="outlined"
            fullWidth
            label="Message"
            required
            multiline
            rows={4}
            value={postData.Reason}
            onChange={(e) => setPostData({...postData, Reason: e.target.value})}
            
            />
            
            <Button className={classes.buttonSubmit} variant='contained ' size="large" type="submit" fullWidth >Post</Button>
            <Button variant='contained' className={classes.buttonClear} size="small" onClick={clear} fullWidth >Clear</Button>

            </form>


        </div>
    
    );
    
}
export default CreateRequest;