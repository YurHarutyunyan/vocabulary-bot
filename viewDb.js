import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017'
const client =new MongoClient(url)
const dbName = 'app_mongo';
async function view(chatId){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection =db.collection(`${chatId}`)
    const vocabulary = await collection.find({}).toArray();
    //console.log('Found documents =>',vocabulary);
    return vocabulary;

}

view()
.then(console.log)
.catch(console.error)
.finally(()=>client.close())

export default view;