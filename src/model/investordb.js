const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nomeusuario: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    senha: {type:String, required:true},
    nomecompleto: {type:String, required:true, unique:true},
    telefone: {type:String},    
    datacadastro: {type:String, default:Date.now},
});

module.exports = mongoose.model('Investor', schema);
