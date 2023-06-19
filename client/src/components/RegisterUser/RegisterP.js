import React, { useState, useEffect } from "react";
import {useFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import FileBase from 'react-file-base64';
import { Link, useHistory } from "react-router-dom";
import { Alert, Stack , AppBar, Container, Button, IconButton, Box, Toolbar, Typography, TextField } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import myimage from '../../images/donationImage.png';
import useStyles from './styles'
import {red} from '@mui/material/colors'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
// cnic, password, fname, lname, blood_group, weight, frequencyDonation, IsDiabetes, IsHypetitus, contactno,  postalCode, Area, Block, City
// const initialValues = {
//     cnic: "",
//     password: "",
//     fname: "",
//     lname: "",
//     blood_group: "",
//     weight: "",
//     frequencyDonation: "",
//     IsDiabetes: "",
//     IsHypetitus: "",
//     contactno: "",
//     postalCode: "",
//     Area: "",
//     Block: "",
//     City: "",
//     // file:'',


// }
// const Schema = Yup.object().shape({

//     cnic: Yup.number().required('The cnic is required must be 13 digits'),
//     password: Yup.string().min(10).required('The password is required'),
//     fname: Yup.string().required('The first name is required'),
//     lname: Yup.string().required('The last name is required'),
//     blood_group: Yup.string().min(2).max(2).required('the blood group is required'),
//     weight: Yup.number().required('the weight is required 11 digits'),
//     frequencyDonation: Yup.number().required('The frequency donation is required'),
//     IsDiabetes: Yup.string().required('This is the required field'),
//     IsHypetitus: Yup.string().required('This is the required field'),
//     contactno: Yup.string().required('The contact number is required'),
//     postalCode: Yup.string().required('The postal code is required'),
//     Area: Yup.string().required('The area is rquired'),
//     Block: Yup.string().required('The block is required'),
//     City: Yup.string().required('The city is required'),
    

// });
function RegisterP() {
    let history = useHistory();
    const classes = useStyles();
    const [error, setError] = useState("");
    const [alert , setAlert] = useState(false);
    const [alertdata, setAlertdata] = useState("");
    const [regData, setRegData] = useState({
                 cnic: "",
                 password: "",
                 fname: "",
                 lname: "",
                 blood_group: "",
                 weight: "",
                 frequencyDonation: "",
                 IsDiabetes: "",
                 IsHypetitus: "",
                 contactno: "",
                 postalCode: "",
                 Area: "",
                 Block: "",
                 City: "",
                 file:'',
    })

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

//    const formik =  useFormik({
//         initialValues : initialValues,
//         validationSchema: Schema,
//         onSubmit : (values) => {

//             console.log("submit");
//                    console.log(values);
    
//             // axios.post("http://localhost:3001/api/authPerson/RegisterP", data).then((response) => {
    
//             //     if (response.data.error) {
//             //         setAlert(true);
//             //         setAlertdata(true);
    
//             //     } else {
//             //         // if success 
//             //         console.log(response.data);
//             //         function start() {
//             //             const now = setTimeout(() => {
//             //                 history.push("/loginP")
//             //             }, 3000)
//             //         }
//             //         start()
//             //     }
    
    
    
//             // })
    
    
    
//         }
//     })

        useEffect(()=>{
                if(regData){
                    setRegData(regData);
                }
        }, [regData])

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(regData);
            console.log(regData.file);
            axios.post("http://localhost:3005/api/authPerson/RegisterP", regData).then((response) => {
    
                if (response.data.error) {
                    setAlert(true);
                    setAlertdata(response.data.error);
    
                } else {
                    // if success 
                    console.log(response.data);
                    function start() {
                        const now = setTimeout(() => {
                            history.push("/loginP")
                        }, 3000)
                    }
                    start()
                } 
            })
            clear();
        }
        const clear = () => {
            setRegData(
                {
                    cnic: "",
                    password: "",
                    fname: "",
                    lname: "",
                    blood_group: "",
                    weight: "",
                    frequencyDonation: "",
                    IsDiabetes: "",
                    IsHypetitus: "",
                    contactno: "",
                    postalCode: "",
                    Area: "",
                    Block: "",
                    City: "",
                    file:'',
                }
            )
        }
    
    const handleScroll = () => {
        const targetPosition = 800;
        window.scrollTo({top: targetPosition, behavior: "smooth"});
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: 'crimson' }} position="static">

                <Toolbar>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            history.push('/user');
                        }}

                    >
                        <HomeRoundedIcon />
                    </IconButton>
                    <Typography variant="h6">Register Now to Save Life</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ display: windowDimensions.width >= 850 && 'flex', justifyContent: windowDimensions.width >= 850 && 'space-evenly' }}>
                <div style={{position:'relative'}}>
                <img style={{ marginRight: '40px', marginTop: '20px', width: windowDimensions.width >= 850 ? 'auto' : '100%', height: windowDimensions.width >= 850 ? '500px' : '700px' }} src={myimage} alt="donation" />
                </div>
                {windowDimensions.width <= 850 && (
                   <IconButton style={{ position: "absolute", top: 580, right: 0, zIndex: 1}} onClick={handleScroll}>
                    <KeyboardDoubleArrowDownIcon style={{height:'50px', width:'50px'}} />
                    </IconButton>
                   
                )}  
            
                {alert && (
               <div>
               <Stack sx={{width:'100%', marginBottom:'20px'}}>
               <Alert onClose={()=>{
                   setAlert(false);
                   setAlertdata("");
                   history.push('/registerP');
               }} severity="error">{alertdata}
               </Alert>
               </Stack>
               </div>
           )}
       
               
                <div style={{ marginTop: '10px'}} className="createPostPage">
                   {/* <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>                     */}
                 {/* {({setFieldValue}) => ( */}


                        <form  autoComplete="off" Validate style={{marginTop: '1000px', color:'white', backgroundColor:red[700] }} className={classes.form} onSubmit={handleSubmit}>
                            
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Cnic"
                            name="cnic"
                            variant="outlined"
                            // className={classes.input}
                            value={regData.cnic}
                            onChange = { (e) => (setRegData({...regData, cnic: e.target.value}))}
                           
                        />

                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            type="password"
                            label="Password"
                            name="password"
                            variant="outlined"
                            value={regData.password}
                            onChange = { (e) => (setRegData({...regData, password: e.target.value}))}
                           
                        />
                           
                           <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="First Name"
                            name="fname"
                            variant="outlined"
                            value={regData.fname}
                            onChange = { (e) => (setRegData({...regData, fname: e.target.value}))}
                           
                        />

                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Last Name"
                            name="lname"
                            variant="outlined"
                            // className={classes.input}
                            value={regData.lname}
                            onChange = { (e) => (setRegData({...regData, lname: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Blood Group"
                            name="blood_group"
                            variant="outlined"
                            // className={classes.input}
                            value={regData.blood_group}
                            onChange = { (e) => (setRegData({...regData, blood_group: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Weight"
                            name="weight"
                            variant="outlined"
                            value={regData.weight}
                            onChange = { (e) => (setRegData({...regData, weight: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="No. of times Donate"
                            name="frequencyDonation"
                            variant="outlined"
                            value={regData.frequencyDonation}
                            onChange = { (e) => (setRegData({...regData, frequencyDonation: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="IsDiabetes? "
                            name="IsDiabetes"
                            variant="outlined"
                            // className={classes.input}
                            value={regData.IsDiabetes}
                            onChange = { (e) => (setRegData({...regData, IsDiabetes: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="IsHypetitus"
                            name="IsHypetitus"
                            variant="outlined"
                            value={regData.IsHypetitus}
                            onChange = { (e) => (setRegData({...regData, IsHypetitus: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Contact Number"
                            name="contactno"
                            variant="outlined"
                            value={regData.contactno}
                            onChange = { (e) => (setRegData({...regData, contactno: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Postal Code"
                            name="postalCode"
                            variant="outlined"
                            // className={classes.input}
                            value={regData.postalCode}
                            onChange = { (e) => (setRegData({...regData, postalCode: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Area"
                            name="Area"
                            variant="outlined"
                            value={regData.Area}
                            onChange = { (e) => (setRegData({...regData, Area: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="Block"
                            name="Block"
                            variant="outlined"
                            value={regData.Block}
                            onChange = { (e) => (setRegData({...regData, Block: e.target.value}))}
                           
                        />
                        <TextField
                            style={{backgroundColor:'white', marginBottom:'20px', fontSize:'20px'}}
                            required
                            label="City"
                            name="City"
                            variant="outlined"
                            // className={classes.input}
                            value={regData.City}
                            onChange = { (e) => (setRegData({...regData, City: e.target.value}))}
                           
                        />

                        <FileBase
                        type="file"
                        multiple={false}
                        onDone  ={({base64})=> setRegData({...regData, file : base64})}

                        />
                    
                           
                            <Button variant="contained" type="submit" style={{ backgroundColor:'whitesmoke', color:red[700] }}>Register</Button>

                        </form>
                   
                </div>
             
            </Container>
        </Box>
    )

}

export default RegisterP;