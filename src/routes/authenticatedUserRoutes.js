const express = require('express')
const authenticatedUserController = require('../controllers/authenticatedUserController')
const middlewareAuthenticatedUser = require('../middlewares/userAuthenticated')

const routes = express.Router()

routes.use(middlewareAuthenticatedUser)
routes.get('/',authenticatedUserController.rotaAutenticadaRaiz)

module.exports = routes