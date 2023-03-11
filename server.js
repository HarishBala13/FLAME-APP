const express=require("express");
const mongoose = require("mongoose");
require("path");
const nodemailer=require("nodemailer");
require("dotenv").config();
const app=express();
const PORT=2000;
const Book=require("./models/books");
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

app.get('/add', async(req,res)=>{
   try {
      await Book.insertMany([
         {
            title: "Car And The Road", body:"Text in this book"
         },
         {
            title:"Games of Thrones",body:"Room clean panatta"
         }
      ]);
   } catch (error) {
      console.log(error);      
   }
});

app.get('/books', async (req,res)=>{
   const book=await Book.find();
   if(book){
      res.json(book);
      console.log(book.title);
   }
   else{
      res.send("Something");
   }
});

 app.get('/emailform',(req,res)=>{
    res.render("emailform",{message:""});
 });
 app.post('/dbregister', async (req,res)=>{
   const email=req.body.email;
   const name=req.body.name;
//    const mobilenumber=req.body.mobilenumber;
//    const collegename=req.body.collegename;
//    console.table(req.body);

//   try{
//    await registerform.insertMany([
//       {
//          User_Name: name, User_College_Name: collegename, User_Email: email, User_Mobile_Number:mobilenumber
//       }
//    ])
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


connectDB().then(()=>{
   app.listen(PORT, ()=>{
      console.log(`Listening On Port ${PORT}`)
   })
})