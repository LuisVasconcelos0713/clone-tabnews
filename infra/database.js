import {Pool} from 'pg'

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'development' ? false : true,
}
)
console.log(process.env.NODE_ENV)

const query = async (queryObjetct) => {
    console.log("Credenciais do database", {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl:true
    })
 try{
    const result = await pool.query(queryObjetct)
    return result;
 } catch (error){
    console.error("Error: ", error)
    throw error;
 } 
}

export default {
    query:query,
}