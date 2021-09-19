const User = require('../models/user.js')

const userController = {
    async  req1(req, res) {
        res.send("Minha primeira rota")
    },
    async register(req,res) {
        
        const {email} = req.body

        try{

            if(await User.findOne({email}))
                return res.status(400).send({error: 'Usuário já cadastrado'})

            const user = await User.create(req.body)

            user.password = undefined

            return res.send(user)
        }catch(err){
            return res.status(400).send({error: `Registration failed ${err}`})
        }
    },
    async a(req,res) {

        const usuarios = await User.find();

        return res.json(usuarios)
    }
}

module.exports = userController
