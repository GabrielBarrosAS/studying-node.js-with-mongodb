const express = require('express')
const userController = require('../controllers/userController.js') 
const routes = express.Router()

routes.get('/',userController.req1)
routes.get('/a',userController.a)
routes.post('/register',userController.register)

module.exports = routes