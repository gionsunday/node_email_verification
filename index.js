require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const express= require('express')
const path = require('path')
const app = express()

const regRouter =  require('./routes/route')

app.use('/', express.static(path.join(__dirname,'public')))
app.use(express.json())

app.use(cors())

app.use('/user/verification', regRouter)


const port = process.env.PORT
const start = async () =>{
    try {
        app.listen(port, console.log(`Server is Live at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
