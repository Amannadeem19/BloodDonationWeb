import React from "react";
import {Link} from 'react-router-dom'
// import {Route, Switch} from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function HomeUser(){

    return (
     
        <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/createrequest"> Create A Request</Link>
       {/* <Link to="/registerP">Donor or Needy</Link>
       <Link to="/loginP">Login User</Link> */}
       <Link to="/showRequests">Show Requests</Link>
       <Link to="/myrequests">My Requests</Link>
       <ToastContainer position='top-center'/>
       </div>
      
    );

    
}

export default HomeUser;