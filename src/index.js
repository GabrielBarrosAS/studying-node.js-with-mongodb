const express = require('express')
const userRoutes = require('./app/routes/userRoutes')
const authenticatedUserRoutes = require('./app/routes/authenticatedUserRoutes')

const PORT = 3000;
const HOST = '0.0.0.0'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/',userRoutes)
app.use('/authenticated',authenticatedUserRoutes)

app.listen(PORT,HOST)