import {fs} from 'fs';
function sendTemp(){
    var text = "";
    fs.readFile('../data/dummy.txt', 'utf-8', (err,data)=>{
        text = data;
    })
    console.log(text);
}