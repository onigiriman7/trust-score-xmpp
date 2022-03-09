const xmpp = require("simple-xmpp");
const fs = require('fs')

class Client{
    constructor(jid,password){
        this.jid = jid;
        this.password = password;
        this.host = "localhost";
        this.port = 5222;
        this.data = [];
        this.score = 6

    }
    startXMPP(){
        xmpp.on("online",data=>{
            console.log("Online!!")
            console.log(`Connected as ${data.jid.user}`)
            // if(to!=null){
            //     this.send(to,message)
            // }
            
        })
    
        xmpp.on("error",error=>console.log(`something went wrong! ${error}`))
        
        xmpp.on("chat",(from,message)=>{
            console.log(`message ${message} from ${from} uccha`)
            this.data.push({from, message})
        })
       
        xmpp.connect({
            "jid":this.jid,
            "password": this.password,
            "host":this.host,
            "port":this.port
        })
    }
    send(to,message){
       
        //sthis.connectToDevice()
        // setTimeout(()=>this.send(to,message),5000);
        //this.connectToDevice()
        xmpp.send(to.toString(),`${message}`)
        console.log("message sent")
    }
    //The temperature is : ${this.data[this.data.length-1]} at ${Math.floor(Date.now()/1000)}
    disconnectXMPP(){
        
        xmpp.disconnect()
        console.log('disconnected, enter trust score ')
        this.updateTS()
        
    }

    connectToDevice(){
        fs.readFile("data.txt","utf-8",(err,data)=>{
            this.data = data.split("\n")
        })
        
    }

    updateTS(){
        fs.open("TS.txt","a",(err,fd)=>{
            fs.write(fd,this.score,()=>{console.log("Ts updated")})
        })
    }
   

}
module.exports = Client;