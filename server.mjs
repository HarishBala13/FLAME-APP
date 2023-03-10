import express from "express";
const app=express()
import path from "path";
import ejs from "ejs";
const port=2000;
import nodemailer from "nodemailer";


app.use(express.urlencoded({extended:false}));
app.use('/assets',express.static("public"));

app.set("view engine","ejs");

app.get('/',(req,res)=>{
   res.render("index");
});

 app.get('/emailform',(req,res)=>{
    res.render("emailform",{message:""});
 });
 app.post('/dbregister',(req,res)=>{
   const email=req.body.email;
   const name=req.body.name;
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
      res.render("index");
   }
   
});
});

 app.listen(port,()=>{
    console.log("Port is running in "+port)
 });