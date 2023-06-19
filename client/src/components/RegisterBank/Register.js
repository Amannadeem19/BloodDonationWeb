import React,{useState,useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios  from "axios";
import { useHistory } from "react-router-dom";
import useStyles from './styles';
import {Button, Container, Box, AppBar, Toolbar, IconButton , Typography} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import myimage from '../../images/donationImage.png';
import {red} from '@mui/material/colors';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}



function Register (){
    let history = useHistory()
    const classes = useStyles();

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


    const [error, setError] = useState("");

    const initialValues = {
        BankName:"",
        password:"",
        openingTimings:"",
        closingTimings:"",
        contactNo_1:"",
        contactNo_2:"",
        plotno:"",
        block:"",
        street:"",
        area:"",
        city:"",
        manager_fname:"",
        manager_lname:""


    }
    const validationSchema = Yup.object().shape({

        BankName: Yup.string().min(3).max(30).required('The blood bank name is required'),
        password: Yup.string().min(10).required('The password is required'),
        openingTimings : Yup.string().required('The opening timing is required'),
        closingTimings: Yup.string().required('The closing timing is required'),
        contactNo_1 : Yup.string().required('the numbers must be exactly 11 digits').matches(/^[0-9]+$/, "Must be only digits").min(11).max(11),
        contactNo_2 : Yup.string().required('the numbers must be exactly 11 digits').matches(/^[0-9]+$/, "Must be only digits").min(11).max(11),
        plotno: Yup.string().required('The plot number is required'),
        block: Yup.string().required('The block is required'),
        street: Yup.string().required('The street is required'),
        area: Yup.string().required('The area is required'),
        city: Yup.string().required('The city is required'),
        manager_fname: Yup.string().required('The manager first name is required'),
        manager_lname: Yup.string().required('The manager last name is required'),

        
    });
    const onSubmit = (data)=>{
        // let response
        // // let success = false;
        // try{
        //  response = await axios.post("http://localhost:3001/api/authBank/Register", data)
       
        // console.log("try wala"+ response.data.error);
        // }catch(err){
        //     console.log("err wala" + err);
        //     setError(err)
        //     console.log("catch wala"+ response.data.error);
        // }
        // console.log(error);

        axios.post("http://localhost:3005/api/authBank/Register", data).then((response)=>{
           
        if(response.data.error){
                console.log(response.data);
                console.log("agye isme");
                history.push("/invalid")
                function start(){
                const timeoutStart = setTimeout(()=>{
                   history.push("/register")
                }, 3000)
            }
                start()
            }  else{
                // if success 
                alert(response.data.error)
                console.log('agya isme2');
                console.log(response.data);
                history.push("/success")
                function start(){
                const now = setTimeout(() =>{
                    history.push("/login")
                },3000)
            }
                start()
        }
        })

        
    }
    // if(error){
    //         history.push("/invalid")
            
    //         const now = setTimeout(()=>{
    //             history.push("/register")

    //         }, 3000)

    //         now();
        

    // }
    // else if(!error){
    //     history.push("/success")
    //     const now = setTimeout(() =>{
    //         history.push("/login")
    //     },2000)
    //     now()
    // }
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
                        history.push('/bloodbank');
                    }}

                >
                    <HomeRoundedIcon />
                </IconButton>
                <Typography variant="h4">Register Now</Typography>
            </Toolbar>
        </AppBar>
        <Container  style={{display: windowDimensions.width >= 850 && 'flex', justifyContent:  windowDimensions.width >= 850 && 'space-evenly'}}>
    <div style={{position:'relative'}}>
    <img style={{ marginRight:'40px', marginTop:'20px', width:  windowDimensions.width >= 850 ? 'auto' : '100%', height: windowDimensions.width >= 850 ? '500px' : '700px'}} src={myimage} alt="donation" />
    </div>
    {windowDimensions.width <= 850 && (
                   <IconButton style={{ position: "absolute", top: 580, right: 0, zIndex: 1}} onClick={handleScroll}>
                    <KeyboardDoubleArrowDownIcon style={{height:'50px', width:'50px'}} />
                    </IconButton>
                   
                )}                 
    
         
            
    
    <div style={{marginTop:'10px'}} className="createPostPage">
        
    
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    
    <Form style={{marginTop: '1000px', color:'white', backgroundColor:red[700] }} className={classes.form}>
    <label>Bank Name:</label>
    
    <ErrorMessage name="BankName" component="span"  style={{color:'whitesmoke'}}/>
    <Field className={classes.input} autoComplete = "off" name="BankName" placeholder="eg: Agha Khan"/>
    
    <label>Password:</label>
    <ErrorMessage name="password" component="span" style={{color:'whitesmoke'}}/>
    <Field  className={classes.input} autoComplete = "off" name="password" placeholder="eg: @!#@aman "/>

    <label>Opening Timings:</label>
    <ErrorMessage name="openingTimings" component="span" style={{color:'whitesmoke'}}/>
    <Field className={classes.input} autoComplete = "off" name="openingTimings" placeholder="eg: 8:00:00am "/>


    <label>Closing Timings:</label>
    <ErrorMessage name="closingTimings"  component="span" style={{color:'whitesmoke'}}/>
    <Field className={classes.input} autoComplete = "off"  name="closingTimings" placeholder="eg: 12:00:00pm "/>

    <label>Contact No 1:</label>
    <ErrorMessage name="contactNo_1" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}  name="contactNo_1" placeholder="eg: 03123231231 "/>

    <label>Contact No2:</label>
    <ErrorMessage name="contactNo_2" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="contactNo_2" placeholder="eg: 03111222333"/>

    <label>Plot:</label>
    <ErrorMessage name="plotno" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="plotno" placeholder="eg: A-7/D "/>

    <label>Block:</label>
    <ErrorMessage name="block" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="block" placeholder="eg: 13 "/>

    <label>Street:</label>
    <ErrorMessage name="street" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="street" placeholder="eg: street is required "/>

    <label>Area:</label>
    <ErrorMessage name="area" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="area" placeholder="eg: Gulshan e Iqbal "/>

    <label>City:</label>
    <ErrorMessage name="city" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="city" placeholder="eg: Karachi "/>

    <label>Manager First Name:</label>
    <ErrorMessage name="manager_fname" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input}   name="manager_fname" placeholder="eg: faraz "/>

    <label>Manager Last Name:</label>
    <ErrorMessage name="manager_lname" component="span" style={{color:'whitesmoke'}}/>
    <Field autoComplete = "off" className={classes.input} name="manager_lname" placeholder="eg: ali "/>


    <Button type="submit"  variant="contained" style={{backgroundColor: 'whitesmoke' , color:red[700]}}>Register</Button>




    </Form>

    </Formik>
    
    </div>

    </Container>
    </Box> 
    )
    
}

export default Register;