var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    email: String,
    name: String,
    password:String,
    phoneNumber: String,
    entrega: mongoose.SchemaTypes.Mixed,
    pendiente: mongoose.SchemaTypes.Mixed,
})