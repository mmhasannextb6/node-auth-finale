import dotenv from 'dotenv'
import path from 'path'
import { cwd } from 'process'

dotenv.config({path:path.join(cwd(), '.env')})

    export const config={
        conncetion_str: process.env.connectionString,
        port:process.env.port
   }