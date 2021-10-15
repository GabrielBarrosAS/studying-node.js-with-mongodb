const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const crypto =  require('crypto')
const mailer = require('../../modules/mailer')

function gerarToken(params={}){
    return jwt.sign({id: params},authConfig.secret,{
        expiresIn: 86400,
    })
    
}

const userController = {
    async  req1(req, res) {

        const users = await User.find().select('+tokenConfirmationEmail +password +emailConfirmed +tokenConfirmationEmailExpire')
        
        res.send(users)
    },
    async register(req,res) {
        
        const {email} = req.body

        try{

            if(await User.findOne({email}))
                return res.status(400).send({error: 'Usuário já cadastrado'})

            const token = crypto.randomBytes(20).toString('hex')
            const now = new Date()
            now.setHours(now.getHours()+1)

            const user = await User.create(req.body)

            const aux = await User.findOneAndUpdate({email},{
                tokenConfirmationEmail:token,
                tokenConfirmationEmailExpire:now
            })

            user.password = undefined

            //enviar um email com o token de confirmação

            mailer.sendMail({
                to: email,
                from: "testApiNodeMongo@email.com",
                template: "auth/confirma_email",
                context: {token},
            },(err) => {
                if (err){
                    console.log(err)
                    return res.status(400).send({error: "Não foi possível enviar email de confirmação"})
                }
                    
                res.send({user,token:gerarToken(user.id)})
            })


        }catch(err){
            return res.status(400).send({error: `Registration failed ${err}`})
        }
    },
    async verificarEmail(req,res){

        const {email,token} = req.body

        try{

        const user = await User.findOne({email}).select('+tokenConfirmationEmail +tokenConfirmationEmailExpire')

        if (! user)
            return res.status(400).send({error: 'Usuário não cadastrado'})
        
        if (user.tokenConfirmationEmailExpire < new Date())
            return res.status(400).send({error: 'Token Expirado'})//gerar novo token
        
        if (!(user.tokenConfirmationEmail === token))
            return res.status(400).send({error: 'Token inválido'})
        
        await User.updateOne({email},{
            emailConfirmed: true
        })

        res.send({user})

        }catch(err){
            return res.status(400).send({error: `Verificação failed ${err}`})
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

        res.send({user,token:gerarToken(user.id)})
    },
}

module.exports = userController
