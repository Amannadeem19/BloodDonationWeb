import React, {useEffect, useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import useStyles from './postStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UserHome from '../../UserHome/UserHome.tsx';
const Post = ({post}) => {
    const classes = useStyles();
    const navigate = useHistory();
    const [cnic, setCnic] = useState("");
    const [postcnic, setPostCnic] = useState("");
    const [key, setKey] = useState(0);
    useEffect(()=>{
      axios.get('http://localhost:3005/api/Person/personinfo', {
        headers:{
            accessToken2 : sessionStorage.getItem("accessToken2"),
        }
    }).then((response)=>{
        if(response.data.error){
          console.log(response.data.error);
            
        }else{
      
          setPostCnic(Number(post?.cnic));
           setCnic(response.data[0].cnic)
          
        }
      })
    }, [])
   

    
    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post?.profile}/>
            <div className={classes.overlay}>
          <Typography variant='h6'>ID: {post?.req_id}</Typography>
          <Typography variant='body2'>Posted: {post?.Time}</Typography> 
          
        </div>
        <div style={{marginLeft:'20px'}}>
        <Typography  variant='h6' gutterBottom>Group: {post?.bloodGroup}</Typography>
        <Typography  variant='h6' gutterBottom>Bottles Needed: {post?.Qtyneed}</Typography>
        <Typography  variant='h6' gutterBottom>Time Period: {post?.TimePeriod} days</Typography>
        </div>
        <CardContent>
          <Typography variant='body2' color="textSecondary" >Message: {post?.Reason}</Typography>
          
        
        </CardContent>
        <CardActions className={classes.cardActions}>
           {(cnic === postcnic) &&(
           
            <Button size='small' color='primary' onClick={()=>{
              
              axios.delete(`http://localhost:3005/api/Request/delete/${post?.req_id}`, {
                headers:{
                    accessToken2: sessionStorage.getItem("accessToken2"),
                }
            }).then((response)=>{
                if(response.data.error){
                  console.log(response.data.error);
                }else{
                    console.log("deleted successfully");
                   
                    
                    
                }
              })
            }}>
              <DeleteIcon fontSize='medium'/>
               Delete
            </Button>

            )}
           
        </CardActions>
            
        </Card>
    )

}

export default Post;