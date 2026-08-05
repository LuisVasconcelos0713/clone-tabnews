import {Pool} from 'pg'

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
}
)

const query = async (queryObjetct) => {
 try{
    const result = await pool.query(queryObjetct)
    return result;
 } catch (error){
    console.error(error)
    throw error;
 } 
}

export default {
    query:query,
}