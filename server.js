const express=require("express");
const mongoose = require("mongoose");
require("path");
const nodemailer=require("nodemailer");
require("dotenv").config();
const app=express();
const PORT=2000;
const registerform = require("./models/registerform");


app.use(express.urlencoded({extended:false}));
app.use('/assets',express.static("public"));

app.set("view engine","ejs");

mongoose.set("strictQuery", false);
const connectDB= async()=>{
   try {
      const conn=await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected")
   } catch (error) {
      console.log(error);      
   }
}

app.get('/',(req,res)=>{
   res.render("index");
});

app.get('/payment',(req,res)=>{
   res.render("payment");
});

app.get('/form',(req,res)=>{
    res.render("form");
 });


 app.post('/signup', async (req,res)=>{
   const email=req.body.email;
   const name=req.body.partname;
   const collegename=req.body.collegename;
   const mobilenumber=req.body.mobile;
   const teamname=req.body.teamname;
   const teamcount=req.body.member;
   const department=req.body.year;
   const techevent=req.body.techevent;
   const nontechevent=req.body.nontechevent;
   const member=parseInt(req.body.member);
   const workshop=req.body.workshop;
   console.table(req.body);

   // try{
   //    await registerform.insertMany([
   //       {
   //          User_Email: email, 
   //          User_Name: name, 
   //          User_College_Name: collegename, 
   //          User_Mobile_Number:mobilenumber, 
   //          User_Team_Members:teamname, 
   //          Team_Count:teamcount,
   //          Year_Of_Study:department,
   //          Technical_Event:techevent,
   //          Non_Technical_Event:nontechevent,
   //          Workshop:workshop
   //       }
   //    ])
   // }
   // catch(error){  console.log(error);   }
   qr=["/assets/images/150.jpg","/assets/images/300.jpg","/assets/images/450.jpg","/assets/images/600.jpg","/assets/images/750.jpg","/assets/images/900.jpg","/assets/images/1050.jpg","/assets/images/1200.jpg","/assets/images/1350.jpg","/assets/images/1500.jpg","/assets/images/1650.jpg","/assets/images/1800.jpg"];
         qrlink=["upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=150.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=300.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=450.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=600.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=750.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=900.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1050.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1200.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1350.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1500.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1650.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1800.00&cu=INR&aid=uGICAgID9js7ZHw"];
         for(i=0;i<qr.length;i++){
          qrc=qr[i].slice(15);
          ind=qrc.indexOf(".");
          qrcode=qrc.slice(0,ind);
          //console.log(qrc);
          money=parseInt(qrcode);
          if(workshop=="yes"){
            amount=member*450;
            if(amount==money){
               image=qr[i];
               link=qrlink[i];
               username=name;
               console.log(link);
               console.log(image);
               res.render("payment");
            }
          }
           else{
              amount=member*150;
              if(amount==money){
                 image=qr[i];
                 link=qrlink[i];
                 username=name;
                 console.log(link);
                 console.log(image);
                 res.render("payment");
              } 
           }
         }  
         
   var transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
         user:process.env.EMAIL_ID,
         pass:process.env.EMAIL_PASSWORD
      }
      });
   
      var mailoptions={
      from:'2k19me070@kiot.ac.in',
      to:email,
      subject:'FLAME 2k23 - Event Registration',
      html:`         
      <h4 style=" font-size: 20px; color: black;">Hi Participant(s),</h4>
      <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Flame_with_bg-removebg-preview.png" alt="FLAME logo" style=" width: 250px; height: 200px;  border-radius: 50%;">
      <p style=" text-align: justify; font-size: 20px; color: black;">Thanks for registering the Event in Flame 2k23. Please ensure that you made a payment, otherwise click the below button to make the payment for confirming the event.</p>
      <center><button style=" border: 2px solid black; border: none;  background: green;  padding: 10px; border-radius: 10px;">
      <a style=" text-decoration: none; color: white;" href="https://healthy-teal-skunk.cyclic.app/payment">Click here to Payment Page</a>
      </button>
      </center>
      <p style=" text-align: justify;  font-size: 20px; color: black;">Thanks,<br>FLAME 2k23.</p>`
   };
      
         transporter.sendMail(mailoptions,(err,info)=>{
         if(err) {   throw err;   }
         else{
         console.log('email sent : '+info.response); 
         
   }
 });
});

connectDB().then(()=>{
   app.listen(PORT, ()=>{
      console.log(`Listening On Port ${PORT}`)
   });
});