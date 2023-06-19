import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './components/RegisterBank/Register';
import Login from './components/LoginBank/Login';
import RegisterP from './components/RegisterUser/RegisterP';
import LoginP  from './components/LoginUser/LoginP';
import CreateRequest  from './components/Post/CreateRequest';
import ShowRequests from './components/Post/ShowRequests';
import Myrequests from './components/Post/Myrequests';


import Error from './Pages/Error';
import Unauth from './Pages/Unauth';
import Unauthc  from './Pages/Unauthc';
import SuccessRegistered from './Pages/SuccessRegistered';

import PersonInfo from './components/PersonInfo/PersonInfo';

import Donate from './components/Donate/Donate';
import ReportDonation from './components/Donate/ReportDonation';
import GetDonations from './components/Donate/GetDonations';
import Donors from './components/Donate/Donors';

import UserHome from './components/UserHome/UserHome.tsx';
import HomeBloodBank from './components/HomeBloodBank/HomeBloodBank.tsx';
import Home from './components/Home/Home';

function App() {
  
  return (
 

      <Router>
          
           {/* <Home/> */}
       
        {/* <Link to="/" id='home'>Home</Link>
        <Link to = "/login" id='home'>Login Blood Bank</Link>
       <Link to="/register" id='home'>Register Blood Bank</Link>
       <Link to="/registerP" id='home'>Donor or Needy</Link>
       <Link to="/loginP" id='home'>Login User</Link>
       <Link to="/createrequest" id='home'> Create Post</Link>
       <Link to="/showRequests" id='home'>Show Posts</Link>
       <Link to="/myrequests" id='home'>My Posts</Link>
       <Link to="/personinfo" id='home'>My info</Link>
       <Link to="/donate" id='home'>Donate Now</Link>
       <Link to="/donations" id='home'>Donations</Link>
       <Link to="/report" id="home">Report Donation</Link> */}

       
       
    
          <Switch>
          <Route path="/"  exact component={Home} /> 
          <Route path="/user" exact component={UserHome}/>
          <Route path="/registerP" exact component = {RegisterP}/>
          <Route path="/loginP" exact component={LoginP}/>

          <Route path='/bloodbank' exact component={HomeBloodBank}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>

          <Route path="/createrequest" exact component = {CreateRequest} /> 
          <Route path="/posts" exact component={ShowRequests}/> 
        
        <Route path="/myposts" exact component={Myrequests}/>
        
        <Route path="/myinfo" exact component={PersonInfo}/>
        
        <Route path="/donate" exact component={Donate}/>
        <Route path="/donations" exact component={GetDonations}/>
        <Route path="/report" exact component={ReportDonation}/>
        <Route path='/donors' exact component={Donors}/>

        {/* <Route path="/request/:id"  exact component={Request}/> */}
        <Route path="/Error" exact component={Error}/>
        <Route path="/invalid" exact component={Unauth}/>
        <Route path="/success" exact component={SuccessRegistered}/>
        <Route path="/invalidcnic" exact component={Unauthc}/>
        {/* <Route path="/homeuser" exact component={HomeUser}/> */}
            
        </Switch>
        
        
      </Router>



    );
}

export default App;
