const express = require('express')
const userController = require('../controllers/userController.js') 
const routes = express.Router()

routes.get('/',userController.req1)
routes.post('/register',userController.register)
routes.post('/authenticate',userController.authenticate)
routes.post('/verifyemail',userController.verificarEmail)

module.exports = routes