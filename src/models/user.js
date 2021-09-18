const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
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
                message: props => `${props.value} não possui 11 digítos`,
            },
            required: [true,'CPF é obrigatório'],
        },
        rg:{
            type: String,
            validate: {
                validator: function(v) {
                  return /\d{11}/.test(v);
                },
                message: props => `${props.value} não possui 11 digítos`,
            },
            required: [true,'RG é obrigatório'],
        },
    },
})

const User = mongoose.model('User',UserSchema)

module.exports = User;