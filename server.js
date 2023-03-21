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

app.get('/aboutus',(req,res)=>{
   res.render("aboutus");
});

app.get('/contact',(req,res)=>{
   res.render("contact");
});

app.get('/events',(req,res)=>{
   res.render("events");
});

app.get('/form',(req,res)=>{
   res.render("form");
});

app.get('/payment',(req,res)=>{
   res.render("payment");
});



 app.post('/signup', async (req,res)=>{
   const email=req.body.email;
   const name1=req.body.partname1;
   const name2=req.body.partname2;
   const name3=req.body.partname3;
   const name4=req.body.partname4;
   const collegename=req.body.collegename;
   const mobilenumber=req.body.mobile;
   const teamname=req.body.teamname;
   const teamcount=req.body.member;
   const department=req.body.year;
   const techevent=toString(req.body.techevent);
   const nontechevent=toString(req.body.nontechevent);
   const member=parseInt(req.body.member);
   console.log(techevent.length);
   console.log(nontechevent.length);
   const workshop=req.body.workshop;
   var amount=0;
   if(workshop=="yes"){
      if(techevent.length>=1 || nontechevent.length>=1){
         amount=member*450;
      }
     
   }
   else{
      amount=member*150;
   }
   try{
      await registerform.insertMany([
         {
            Participant_Email : email, 
            Participant_Name_1 : name1, 
            Participant_Name_2 : name2, 
            Participant_Name_3 : name3, 
            Participant_Name_4 : name4, 
            College_Name : collegename, 
            Participant_Mobile_Number : mobilenumber, 
            Team_Name : teamname, 
            Team_Count : teamcount,
            Year_Of_Study : department,
            Technical_Event : techevent,
            Non_Technical_Event : nontechevent,
            Workshop : workshop,
            Registration_Fee : amount
         }
      ])
   }
   catch(error){  console.log(error);   }
   console.log(email);     
   

 qr=["/assets/images/150.jpg","/assets/images/300.jpg","/assets/images/450.jpg","/assets/images/600.jpg","/assets/images/750.jpg","/assets/images/900.jpg","/assets/images/1050.jpg","/assets/images/1200.jpg","/assets/images/1350.jpg","/assets/images/1500.jpg","/assets/images/1650.jpg","/assets/images/1800.jpg"];
    for(i=0;i<qr.length;i++){
        qrc=qr[i].slice(15);
        console.log("QRC"+qrc)
        ind=qrc.indexOf(".");
        qrcode=qrc.slice(0,ind);
        money=parseInt(qrcode);
        console.log(money);
        
        if(workshop=="yes"){
          if(amount==money){
            console.log(amount);
             image=qr[i];
             Participantname=name1;
             console.log(image);
            
             var transporter=nodemailer.createTransport({
               service:'gmail',
               host: "smtp.gmail.com",
               port: 465,
               secure: true,
               auth:{
                  user:process.env.EMAIL_ID,
                  pass:process.env.EMAIL_PASSWORD
               }
               });
            
                  await new Promise((resolve,reject)=>{
                  transporter.verify(function (error,success){
                     if(error){
                        console.log(error);
                        reject(error);
                     }
                     else{
                        console.log("Server is ready to send the Email....Done!!");
                        resolve(success);
                     }
                  });
                  });   

                  var mailoptions={
                     from:process.env.EMAIL_ID,
                     to:email,
                     subject:'FLAME 2k23 - Event Registration',
                     html:`         
                     <h4 style=" font-size: 20px; color: black;">Hi Participant(s),</h4>
                     <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Flame_with_bg-removebg-preview.png" alt="FLAME logo" style=" width: 250px; height: 200px;  border-radius: 50%;">
                     <p style=" text-align: justify; font-size: 20px; color: black;">Thanks for registering the Event in Flame 2k23. Please ensure that you made a payment, otherwise make the payment for confirming the event.</p>
                     <p style=" text-align: justify;  font-size: 20px; color: black;">Regards,<br>FLAME 2k23.</p>
                     <br><br>
                     <a href="https://www.facebook.com/profile.php?id=100090942617082" target="_blank"> <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Facebook.png" alt="Facebook" title="Facebook"> </a>
                     <a href="https://instagram.com/flame_mechroniz_2k23?igshid=ZDdkNTZiNTM=" target="_blank"> <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Instagram.png" alt="Instagram" title="Instagram"></a>
                     <a href="https://www.linkedin.com/in/flame-kiot-26aa53269/" target="_blank"><img src="https://healthy-teal-skunk.cyclic.app/assets/images/Linkedin.png" alt="Linkedin" title="Linkedin"></a>`
                        };    
                        await new Promise((resolve,reject)=>{
                           transporter.sendMail(mailoptions,(err,info)=>{
                              if(err) console.log(err);
                              else  console.log('email sent : '+info.response);          
                           });
                     });
                     res.render("payment");  
            }
            
         }

         else{
               if(amount==money){
                  console.log(amount);
                  image=qr[i];
                  Participantname=name1;
                  console.log(image);
                  var transporter=nodemailer.createTransport({
                     service:'gmail',
                     host: "smtp.gmail.com",
                     port: 465,
                     secure: true,
                     auth:{
                        user:process.env.EMAIL_ID,
                        pass:process.env.EMAIL_PASSWORD
                     }
                     });
                  
                        await new Promise((resolve,reject)=>{
                        transporter.verify(function (error,success){
                           if(error){
                              console.log(error);
                              reject(error);
                           }
                           else{
                              console.log("Server is ready to send the Email....Done!!");
                              resolve(succes);
                           }
                        });
                        });   
      
                        var mailoptions={
                           from:process.env.EMAIL_ID,
                           to:email,
                           subject:'FLAME 2k23 - Event Registration',
                           html:`         
                           <h4 style=" font-size: 20px; color: black;">Hi Participant(s),</h4>
                           <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Flame_with_bg-removebg-preview.png" alt="FLAME logo" style=" width: 250px; height: 200px;  border-radius: 50%;">
                           <p style=" text-align: justify; font-size: 20px; color: black;">Thanks for registering the Event in Flame 2k23. Please ensure that you made a payment, otherwise make the payment for confirming the event.</p>
                           <p style=" text-align: justify;  font-size: 20px; color: black;">Regards,<br>FLAME 2k23.</p>
                           <br><br>
                           <a href="https://www.facebook.com/profile.php?id=100090942617082" target="_blank"> <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Facebook.png" alt="Facebook" title="Facebook"> </a>
                           <a href="https://instagram.com/flame_mechroniz_2k23?igshid=ZDdkNTZiNTM=" target="_blank"> <img src="https://healthy-teal-skunk.cyclic.app/assets/images/Instagram.png" alt="Instagram" title="Instagram"></a>
                           <a href="https://www.linkedin.com/in/flame-kiot-26aa53269/" target="_blank"><img src="https://healthy-teal-skunk.cyclic.app/assets/images/Linkedin.png" alt="Linkedin" title="Linkedin"></a>`
                              };    
                              await new Promise((resolve,reject)=>{
                                 transporter.sendMail(mailoptions,(err,info)=>{
                                    if(err) console.log(err);
                                    else  console.log('email sent : '+info.response);          
                                 });
                           });
                  res.render("payment");
               
               } 
            } 
         }
});

connectDB().then(()=>{
   app.listen(PORT, ()=>{
      console.log(`Listening On Port ${PORT}`)
   });
});