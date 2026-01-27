import express from 'express'
import 'dotenv/config'
import { connectToDb } from './config/db.js'

const app = express()

const PORT=process.env.PORT

connectToDb();

app.get('/', (req, res)=>{
    res.send("Hello from backend")
})

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})