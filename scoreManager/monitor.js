const sha256 = require('sha256');
const fs = require('fs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const keys = [
     "helloworld",
     "password", 
     "hunterhunter"
]

function calculateScores(){
  var scoreData = JSON.parse(fs.readFileSync("./scoreManager/scoreLogs.json"));
  //console.log(scoreData)
  var scoreTable = {}
  const users = ['varun', 'pavan', 'akash']
  users.forEach(user=>{
      var filterUser = [];
      for(var i = 0; i<scoreData.length; i++){
          if(scoreData[i].to === user){
              filterUser.push(scoreData[i]);
          }
      }
      //console.log(filterUser);
      var sum = 0;
      for(var j =0;j<filterUser.length;j++){
          for(var k=0;k<keys.length;k++){
              if(filterUser[j].key == sha256(keys[k])){
                  var mainKey = keys[k];
                  var scoreKey = cryptr.decrypt(filterUser[j].score);
                  var score = parseInt(scoreKey.replace(mainKey, ""), 10);
                  sum += score/filterUser.length; 
                  console.log("ScoreKey: ", scoreKey.replace(mainKey, ""));
              }
              //console.log("Keys are:" + k.toString(), keys[k]);
          }
      }
      scoreTable[filterUser[0].to] = sum;
      console.log(scoreTable);
      console.log("-------------------")
  })
  return scoreTable;
}

calculateScores();

module.exports = calculateScores;