const express=require('express');
const app=express();
const mongoose=require('mongoose');
const book = require('./models/book');
const ejs = require('ejs');
const path=require("path");
mongoose.set("strictQuery",false);
const connectDb=async()=>{
    try{
        const conn= await mongoose.connect("mongodb+srv://Harish_B_13:gIhjMqk8P2rUd1Cu@cluster0.rzmu9xs.mongodb.net/test");
        console.log("Mongodb connected");
        vari=await book.find();
        console.log(vari);
    }catch(error){
        console.log(error);
    }
}
const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("form");
})
app.post("/signupValue",async(req,res)=>{
    console.log(req.body);
   const member=parseInt(req.body.member);
   const  workshop=req.body.workshop;
   qr=["./images/150.jpg","./images/300.jpg","./images/450.jpg","./images/600.jpg","./images/750.jpg","./images/900.jpg","./images/1050.jpg","./images/1200.jpg","./images/1350.jpg","./images/1500.jpg","./images/1650.jpg","./images/1800.jpg"];
   qrlink=["upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=150.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=300.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=450.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=600.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=750.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=900.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1050.00&cu=INR&aid=uGICAgID9js7ZHw"
,"upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1200.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1350.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1500.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1650.00&cu=INR&aid=uGICAgID9js7ZHw","upi://pay?pa=jeevaaravinth2001-1@okhdfcbank&pn=JeevaAravinthJV&am=1800.00&cu=INR&aid=uGICAgID9js7ZHw"];
   for(i=0;i<qr.length;i++){
    qrc=qr[i].slice(9);
    ind=qrc.indexOf(".");
    qrcode=qrc.slice(0,ind);
    // console.log(qrc);
    money=parseInt(qrcode);
    if(workshop=="yes"){
      amount=member*450;
      if(amount==money){
         image=qr[i];
         link=qrlink[i];
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
           console.log(link);
           console.log(image);
           res.render("payment");
        } 
     }
   }
   
})

app.get("/payment",(req,res)=>{
    res.render("payment");
})
connectDb().then(()=>{
    app.listen(350,()=>{
        console.log("Port connected");
    })
});

