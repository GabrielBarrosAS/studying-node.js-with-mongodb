const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Nome Obrigatório'],
    },
    email:{
        type: String,
        unique: true,
        required: [true,'Obrigatório informar email'],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true,'Senha Obrigatória'],
        select: false,
    },
    createAt:{
        type:Date,
        default: Date.now,
    },
    documents:{
        cpf:{
            type: String,
            validate: {
                validator: function(v) {
                  return /\d{11}/.test(v);
                },
                message: props => `${props.value} não está no formato correto`
            },
            required: [true,'CPF é obrigatório'],
        },
        rg:{
            type: String,
            validate: {
                validator: function(v) {
                  return /\d{11}/.test(v);
                },
                message: props => `${props.value} não está no formato correto`
            },
            required: [true,'RG é obrigatório'],
        },
    },
})

UserSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10)

    this.password = hash

    next()
})

const User = mongoose.model('User',UserSchema)

module.exports = User;