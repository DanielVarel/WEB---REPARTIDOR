var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    empresa: { type: String, required: true,},
    direccion: { type: String, required: true},
    distancia: { type: String, required: true},
    color: { type: String, required: true},
    status: { type: Number, required: true},
    mapa: { type: Object, required: true},
    precio: { type: Object, required: true},
    envios: mongoose.SchemaTypes.Mixed
})

module.exports = mongoose.model('ordenes', esquema)