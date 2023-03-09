import express from "express";
const runapp=express()
const port=2000;
 runapp.get('/',(req,res)=>{
    res.send("hello Harish");
 });
 runapp.listen(port,()=>{
    console.log("Port is running in "+port)
 })