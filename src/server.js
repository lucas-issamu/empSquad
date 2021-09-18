const express = require('express')
const bodyParser = require('body-parser')
const fs = require('../src/connection')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

fs.connection();

app.get("/", (req, res) => {
    res.send('Welcome.')
    res.send('How are you?')
})

const employeeRouter = require('./Routes/employee')
app.use('/employee', employeeRouter)

const squadRouter = require('./Routes/squad')
app.use('/squad', squadRouter)

app.listen(3000), ()=>{
    console.log('Listening on port 3000');
}

