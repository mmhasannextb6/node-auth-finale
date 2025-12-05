import express, { Response,Request } from 'express'
import {Pool} from 'pg'
import dotenv from 'dotenv'
const app = express()
import path from 'path'
import { cwd } from 'process'


dotenv.config({path:path.join(cwd(), '.env')})
app.use(express.json())

const pool = new Pool({
  connectionString:process.env.connectionString,
})

const initDB=async()=>{
  //user table
 try{
   await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      age INT,
      Phone VARCHAR(15),
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('db initiala lized')
 }catch(err){
  console.error("dB error", err)
 }

//todos table
 try{
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()      
      )
    `)
 }catch(err){
  console.error("db error", err)
 }
}
initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


app.post('/', (req:Request, res:Response) => {
  console.log(req.body)
 res.status(200).json({
  success:true,
  message:'create successfully',
  data:req.body
 })
})

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})
