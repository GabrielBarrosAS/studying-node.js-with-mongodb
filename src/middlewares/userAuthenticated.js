const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization
    //If são verificações para otimizar
    if (!authHeader)
        return res.status(401).send({error:"Não possui token de autenticação"})

    const parts = authHeader.split(' ')

    if (!(parts.length === 2))
        return res.status(401).send({error:"Bearer + token esperado"})

    const [bearer, token] = parts

    if (!/^Bearer$/i.test(bearer))
        return res.status(401).send({error:"Token mal formatado"})

    jwt.verify(token,authConfig.secret,(err,decoded) => {
        if (err)
            return res.status(401).send({error:"Token invalid"})

        req.userId = decoded.id
        return next()
    })
}
