const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const loginModel = require("./models/admin")
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://mercy1112:mercy1112@cluster0.8x8j3ya.mongodb.net/hospitaldb?retryWrites=true&w=majority&appName=Cluster0")

app.get("/test",(req,res)=>{
    res.json({"status":"success"})
})

app.post("/adminSignup",(req,res)=>{
    let input=req.body
    let hashedpassword=bcrypt.hashSync(input.password,10)
    //console.log(hashedpassword)
    input.password=hashedpassword
    console.log(input) 
    let result= new loginModel(input)
    result.save()
    res.json({"status":"success"})
    
})



app.listen(5050,()=>{
    console.log("server started")
})

