const User = require('../models/user.js')

const userController = {
    async  req1(req, res) {
        res.send("Minha primeira rota")
    },
    async register(req,res) {
        try{
            const user = await User.create(req.body)
            return res.send(user)
        }catch(err){
            return res.status(400).send({error: 'Registration failed'})
        }
    },
    async a(req,res) {

        const usuarios = await User.find();

        return res.json(usuarios)
    }
}

module.exports = userController
