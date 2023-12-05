import {MongoClient} from 'mongodb'

const url = 'mongodb://localhost:27017'
const client =new MongoClient(url)
const dbName = 'app_mongo';
async function deleteObjects(chatId,itemsToDelete){
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection =db.collection(`${chatId}`)
    if(itemsToDelete.length===1){
        collection.deleteOne(itemsToDelete)
    }else{
        collection.deleteMany(...itemsToDelete)
    }
    return 'deleted.'
}

deleteObjects()
.then(console.log)
.catch(console.error)
.finally(()=>client.close())

export default deleteObjects;