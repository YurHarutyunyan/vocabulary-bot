import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017'
const client =new MongoClient(url)
const dbName = 'app_mongo';
async function insert(chatId,itemsToInsert){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection =db.collection(`${chatId}`)
    const insertResult = await collection.insertMany(itemsToInsert);
    const findResult = await collection.find({}).toArray()
    console.log('Inserted documents =>', insertResult);
    console.log('Found documents =>',findResult);
    return 'done.'

}

insert()
.then(console.log)
.catch(console.error)
.finally(()=>client.close())

export default insert;