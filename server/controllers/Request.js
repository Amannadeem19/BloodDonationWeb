const mysql = require('mysql2');
const {StatusCodes} = require('http-status-codes')
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})
const CreateRequest = (req, res)=>{
   
    console.log(req.user);
    //  console.log(req.user.cnic); 
    
    const {bloodGroup, QtyNeed,Reason, timePeriod, profile} = req.body;
    const cnic = req.user.cnic;
    const date = new Date()
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const Time = hrs + ':' + mins+ ':' +seconds; 
    console.log(Time);
    console.log(date);
    console.log(cnic);
    db.query('Insert into bloodneedrequirement (cnic, bloodGroup, Qtyneed, Date, Time, Reason, TimePeriod, profile) values (?,?,?,?,?,?,?, ?)', [cnic, bloodGroup, QtyNeed, date, Time, Reason, timePeriod, profile], (err, results)=>{
        if(err){
            return res.json({error: err})
        }else{
            return res.status(StatusCodes.OK).json('Data inserted in BloodNeedRequirement')
        }

    })   

}

const getAllRequests = (req, res) => {
    db.query('Select * from bloodneedrequirement' , (err, results)=>{
        if(err){
            console.log("yeh wala" + err);
            // res.json({error: err})
        }else{
            console.log("yeh wala2" );
            res.send(results)
        }
    })

}

const getRequests = (req,res)=>{
    const cnic = req.user.cnic;
    console.log(cnic);
    db.query('select * from bloodneedrequirement where cnic = ? ', [cnic], (err, results)=>{
        if(err){
            console.log('error get request me aya');
            return res.json({error : err})
        }if(results.length === 0){
            console.log('no data found');
            return res.json({err : 'No data found'})
        }
        else{
            res.send(results)
        }
    })
}
const deleteRequest = (req, res)=>{

    const cnic = req.user.cnic;
    const req_id =req.params.id;
    console.log(cnic);
    console.log(req_id);
    db.query('delete from fullfilleddonation where req_id = ?', [req_id], (err, results)=>{
        if(err){
            return res.json({error: err})
        }else{
            db.query('delete from  bloodneedrequirement where cnic = ? AND req_id = ?', [cnic, req_id], (err, results)=>{
                if (err){
                    return res.json({error: err})
                }else{
                    console.log("post deleted successfully");
                    res.json('post successfully deleted')
                }
            })

        }
    })
    
}
// do update in this code 
const updateRequest = (req, res)=>{

    const req_id = req.params;
    const {bloodGroup, QtyNeed,Reason, TimePeriod} = req.body;
    const cnic = req.user.cnic;
    const date = new Date()
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const Time = hrs + ':' + mins+ ':' +seconds; 
    console.log(Time);
    console.log(date);
    console.log(cnic);

    db.query('UPDATE bloodneedrequirement SET bloodGroup = ?, Qtyneed = ?, Reason = ? , TimePeriod = ?, Date = ? , Time = ? where req_id = ? AND cnic = ?' [bloodGroup, QtyNeed, Reason, TimePeriod, date, Time, req_id, cnic], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            console.log('successfully updated post');
            return res.send(results)
        }
    })

}

const getRequestById = (req, res) =>{
    const id = req.params.id;

    db.query('select * from bloodneedrequirement where req_id = ? ', [id], (err, results)=>{
        if(err){
            console.log('error get request by id me aya');
            return res.json({error : err})
        }if(results.length === 0){
            console.log('no data found');
            return res.json({err : 'No data found'})
        }
        else{
            console.log("request id me result aya");
            res.send(results)
        }
    })


}

module.exports ={ CreateRequest, getAllRequests, getRequests, deleteRequest, updateRequest,getRequestById };