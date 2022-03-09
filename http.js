const Client = require('./src/client')
const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()
const fs = require('fs');
const sha256 = require('sha256');
const calculateScores = require('./scoreManager/monitor')

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

var user = "" ;
app.post('/',(req,res)=>{
    console.log(req.body)
    user = new Client(req.body.name,req.body.password)
    console.log(user.jid)
    user.startXMPP()
    res.redirect('/service')
})
app.post("/service",(req,res)=>{
    const to = req.body.to
    const message = req.body.message
    console.log("hello",req.body)
    user.send(to,message)
    res.redirect('/service')
})
app.post("/score", (req,res)=>{
    console.log(req.body);
    const encryptScore = cryptr.encrypt(req.body.score.toString() + req.body.key.toString())
    const newData = {to:req.body.to, score:encryptScore, key:sha256(req.body.key)};
   
    var rawData = fs.readFileSync('./scoreManager/scoreLogs.json');
    var scoreData = JSON.parse(rawData);
    console.log(scoreData);
    scoreData.push(newData);
    // fs.open("./scoreLogs.json","a",(err,fd)=>{
    //     fs.write(fd, data, ()=>console.log("Shared Score File Updated!"))
    // })
    fs.writeFile("./scoreManager/scoreLogs.json",JSON.stringify(scoreData),(e)=>console.log("Error", e));
    
})
app.get("/service",(req,res)=>{
    res.sendFile(path.join(__dirname,'public/', 'service.html'))
})
app.get('/logs',(req,res)=>{
    res.json(user.data)
})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/', 'index.html'))
})

app.get('/scoreTable', (req,res)=>{
    const data = calculateScores();
    res.json(data)
})
app.use('/static', express.static('./src/'))
console.log("running")
app.listen(3000)