const express = require('express')
const bodyParser = require('body-parser')
const db = require('../src/connection')
const employeeRouter = require('./Routes/employee')
const squadRouter = require('./Routes/squad')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

db.connection().then(() => {
    app.get("/", (req, res) => {
        res.send('Welcome.')
    })

    app.use('/employee', employeeRouter)

    app.use('/squad', squadRouter)

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    })
})

