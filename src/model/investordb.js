const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    fullname: {type:String, required:true, unique:true},
    telephone: {type:String},    
    dateregister: {type:String, default:Date.now},
});

module.exports = mongoose.model('Investor', schema);
