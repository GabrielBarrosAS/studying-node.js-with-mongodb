const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

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
    async authenticate(req,res) {

        const {email,password} = req.body

        const user = await User.findOne({email}).select("+password")

        if (!user)
            return res.status(400).send({error:"Usuário não cadastrado"})

        if (!await bcrypt.compare(password,user.password))
            return res.status(400).send({error:"Senha inválida"})

        user.password = undefined

        res.send(user)
    }
}

module.exports = userController
