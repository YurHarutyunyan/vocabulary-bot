import express, { application } from "express";
import "dotenv/config";
import fetch from 'node-fetch'
const port = 5001;  


const app = express();
app.use(express.json());
let state = 'not set'
let foreignSentence = ''
let translatedSentence = ''
async function sendMessageToTelegramBot(chatId,text){
  await fetch(`https://api.telegram.org/bot6272421042:AAGBfLDID_NX1Co-0VZerJyhTkKnxmhkDIA/sendMessage`,
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
    sendMessageToTelegramBot(chatId,`Saved : ${foreignSentence}  ----  ${translatedSentence}`)
  }
res.send({status:'ok'})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
