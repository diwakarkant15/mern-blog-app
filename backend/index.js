import express from 'express'
import 'dotenv/config'
import { connectToDb } from './config/db.js'
import authRouter from './routes/auth.routes.js'

const app = express()

const PORT=process.env.PORT

connectToDb();

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Hello from backend")
})

app.use('/api/v1', authRouter)

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})