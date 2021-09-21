authenticatedUserController = {
    async rotaAutenticadaRaiz(req,res){
        res.send({authenticated:"Usuário comum autenticado"})
    }
}

module.exports = authenticatedUserController