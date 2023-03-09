import express from "express";
const app=express()
import sqldb from "mysql";
import path from "path";
import ejs from "ejs";
const port=2000;
import nodemailer from "nodemailer";

const config={
   connectionLimit: 50,
   host: '127.0.0.1', 
   database:'FLAME_2k23', 
   user:'root', 
   password:'Harish@123', 
   port:'3306'
}
var database=sqldb.createPool(config);

database.connect((err,res)=>{
   if(err) console.log(err);
   console.log("MySQL Connected Successfully...");
});

app.use(express.urlencoded({extended:false}));
import { fileURLToPath}  from "url";
import { config } from "process";
const __filename = fileURLToPath(import.meta.url);
console.log("My Filename : "+__filename);
const __dirname=path.dirname(__filename);
console.log("My Dirname : "+__dirname);
const location=path.join(__dirname,'./public');
console.log("My location : "+location);
app.use(express.static(location));

app.set("view engine","ejs");


 app.get('/emailform',(req,res)=>{
    res.render("emailform",{message:""});
 });
 app.post('/dbregister',(req,res)=>{
   const email=req.body.email;
   const name=req.body.name;
   const password=req.body.set_password;
   database.getConnection(function(err,temporary){
      if(err) throw err;
      else {
         database.query('SELECT USER_EMAIL FROM  FLAME_REGISTRATION WHERE USER_EMAIL=?',[email],[FLAME_2k23],async(error,result)=>{
            console.log(email);
             if(error) console.log(error);
             else if(result.length>0){
                 res.render("emailform",{message:"Email Id already taken"});
             }
       
         else{database.query('INSERT INTO  FLAME_REGISTRATION SET?',{USER_NAME:name,USER_EMAIL:email,USER_PASSWORD:password},(error2,result2)=>{
             if(error2){
                 throw error2;           
             }
             else{
                 var transporter=nodemailer.createTransport({
                     service:'gmail',
                     auth:{
                       user:'2k19me016@kiot.ac.in',
                       pass:'harish@13kiot'
                     }
                     });
                     var mailoptions={
                     from:'2k19me016@kiot.ac.in',
                     to:email,
                     subject:'Thanks for Registering',
                     text:`Hi `+name,
                     html:`<div>
                     <h4 style="font-size:20px;">Thanks for choosing our Service</h4>
                     <img style=" width: 65px; height: 45px; border-radius: 50%; " src="https://i0.wp.com/kiot.ac.in/wp-content/uploads/2022/04/logo.png?resize=134%2C138&ssl=1" alt="FLAME logo">
                     <p style="text-align:justify;">Thanks,<br>FLAME 2k23.</p>
                     </div>`
                   };
                   transporter.sendMail(mailoptions,(err,info)=>{
                     if(err) {
                         throw err;
                     }
                     else{
                     console.log('email sent : '+info.response);
                 }
             });
                 res.render("home");
             }
         });
        
      }
   })
   
}
});
});

 app.listen(port,()=>{
    console.log("Port is running in "+port)
 })