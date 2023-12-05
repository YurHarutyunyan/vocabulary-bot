import express from "express";
import "dotenv/config";
import fetch from 'node-fetch';
import insert  from '/home/yuri/dev/vocabulary-bot/insertDb.js';
import view from "/home/yuri/dev/vocabulary-bot/viewDb.js";
import deleteDb from "/home/yuri/dev/vocabulary-bot/deleteDb.js";
const port = 5001;  

const app = express();
app.use(express.json());
let state = 'not set'
let foreignSentence = ''
let translatedSentence = ''
async function sendMessageToTelegramBot(chatId,text){
  await fetch(`https://api.telegram.org/bot${process.env.bot_token}/sendMessage`,
  {
     method:'POST',
    headers:{
     'Content-Type':'application/json'
    },
    body:JSON.stringify({
     'chat_id':`${chatId}`,
    'text':`${text}`
   })
     
  }).catch((err)=>console.log(err))
}
app.get("/api/health", (req, res) => {
  res.send("¯\\_(ツ)_/¯");
});

app.post("/api", (req, res) => {
  let chatId = req.body.message.chat.id;
  let message = req.body.message.text;
  if(message==='/set'){
    state = 'waiting'
    sendMessageToTelegramBot(chatId,'please enter your text in foreign language')
  }else if(state==='waiting'){
    state='waiting1';
    foreignSentence = message;
    sendMessageToTelegramBot(chatId,'please enter translation')
  }else if(state==='waiting1'){
    state='not set'
    translatedSentence = message;
    insert(chatId,[{translatedSentence:translatedSentence,foreignSentence:foreignSentence,wrongAnswer:false,wrongAnswerCount:0}])
    sendMessageToTelegramBot(chatId,`Saved : ${foreignSentence}  ----  ${translatedSentence}`)
  }
  else if  (message==="/view"){
    sendMessageToTelegramBot(chatId,'here is your vocabulary')
    view(chatId).then((voc)=>{
      
      const arrayToSend =[]
       voc.forEach((item)=>{
        arrayToSend.push({foreignSentence:item['foreignSentence'],translatedSentence:item['translatedSentence']})
      })
      sendMessageToTelegramBot(chatId,JSON.stringify(arrayToSend))
    })
  }
  else if(message==="/delete"){
    state='waiting for delete data'
    sendMessageToTelegramBot(chatId,'enter text you want to delete');

}
else if(state==='waiting for delete data'){
  const deleteData = message;
}

res.send({status:'ok'})
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
