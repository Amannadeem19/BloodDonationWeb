import axios from "axios";
import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'


function Donate(){
    
    const[bankNameList, setBankNameList] = useState([])
    const[dataset, setData] = useState("")
    const[blood, setblood] = useState("")
    const [req, setReq] = useState("")

    function getBank(){
       
        axios.get('http://localhost:3005/api/Donation/donate', {
            headers:{
                accessToken2: sessionStorage.getItem('accessToken2'),
            }
        }).then((response)=>{
            if(response.data.error){
                console.log('error in donate');
                toast.error(response.data.error)
            }else{
                console.log(response.data);
                setBankNameList(response.data)
                // toast.success(response.data)
            }
            
        })
       
    }

const handleChange = (event)=>{           
       setData(event.target.value)
}

 // function ends
    useEffect(()=>{

        getBank()
   
    },[])

    return (
        <div>
                <h1>Choose Blood Bank</h1>
                <select value={dataset.bankName} onChange={handleChange}>
                 <option value="" >Choose Blood Bank</option>
                { 
                    bankNameList.map((val, key)=>{
                    return(
                        <option value={val.BankName} > {val.BankName}</option>
                    )
                    }
                    )
                }                        
            </select>
        </div>
    );


}

export default Donate;






