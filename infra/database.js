import {Client} from 'pg'

const query = async (queryObjetct) => {
 const client = new Client({
    host: "localhost",
    port: 5432,
    user:"postgres",
    database:"postgres",
    password:"Local_Password",
 })
 await client.connect()
 const result = await client.query(queryObjetct)
 await client.end();
 return result;
}

export default {
    query:query,
}