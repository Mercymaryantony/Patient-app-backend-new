const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const loginModel = require("./models/admin")
const doctorModel = require("./models/doctor")
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


app.post("/adminSignIn",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    res.json({"status":"success"})
                } else {
                    res.json({"status":"wrong password"})
                }
            } else {
                res.json({"status":"username doesnt exist"})
            }
        }
    ).catch()
})

app.post("/addDoctor",(req,res)=>{
    let input=req.body
    let token=req.headers.token
    jwt.verify(token,"Patient-app",(error,decoded)=>{
        if (decoded && decoded.email) {
            let result=new doctorModel(input)
            result.save()
            res.json({"status":"success"})
        } else {
            res.json({"status":"invalid authenticatiion"})
        }
    })
})

app.listen(5050,()=>{
    console.log("server started")
})

