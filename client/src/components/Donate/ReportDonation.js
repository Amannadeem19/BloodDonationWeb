import axios from "axios";
import React, {useState} from "react";
import { toast } from "react-toastify";
function ReportDonation(){
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    

   const generate = ()=>{
    axios.get('http://localhost:3005/api/Blood/report').then((response)=>{

        if(response.data.error){
            toast.error(response.data.error)
        }else{
            console.log('generate report');
            console.log(response.data);
            setData(response.data)
            const generate2 = ()=>{
                axios.get('http://localhost:3001/api/Blood/report1').then((response)=>{
            
                    if(response.data.error){
                        toast.error(response.data.error)
                    }else{
                        console.log('generate report2');
                        
                       
                    }
                })
            
               }// ends function
               generate2()
        }
    })

   }

   const generate3 = (req_id)=>{
    axios.get(`http://localhost:3001/api/Blood/report2/${req_id}`).then((response)=>{

        if(response.data.error){
            toast.error(response.data.error)
        }else{
            console.log('generate report3');
            console.log(response.data);
            setData2(response.data)
           
        }
    })

   }// ends function3


    return (

        <div>        
        <div id="main1">
            <div id="heading">
                <h1 id="report-head">Report</h1>
            </div>
            <button id="btn-del" onClick={generate}>Generate</button>
            
            </div>
        {
            data.map((val,key)=>{
                return (
                    
                    <div className="requests">
                        
                        <div>
                            <div className="main2">
                            <h3>Req-Id : {val.req_id}</h3>
                            <h3>Blood Group {val.bloodGroup}</h3>
                            <h3>Qty Need: {val.Qtyneed}</h3>
                            <h3>Qty Given:  {val.Given}</h3>
                            <button id="btn-del" onClick={()=>{generate3(val.req_id)}}>Status</button>
                            {
                          
                             data2.map((val2, key)=>{

                                return    <h3>Status : {val2.status}</h3>
                             })
                            }
                           
                           
                            </div>
                           
                        
                        </div>

                    </div>
                );
            })
        }
       
       
        </div>


    

    );


}

export default ReportDonation;