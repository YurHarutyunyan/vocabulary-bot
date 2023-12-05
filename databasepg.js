import pg from 'pg'
const {Client} =pg
const client =new Client({
    host:'172.17.0.2',
    user:'postgres',
    port:'5432',
    password:'root',
    database:'postgres'
})
client.connect();
client.query(`
select * from  dictionary

`,(err,res)=>{
    if(!err){
        console.log(res.rows)
    }else{
        console.log(err.message)
    }
    client.end
})