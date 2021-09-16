const express = require('express')
const userRoutes = require('./routes/userRoutes.js')

const PORT = 3000;
const HOST = '0.0.0.0'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/',userRoutes)

app.listen(PORT,HOST)