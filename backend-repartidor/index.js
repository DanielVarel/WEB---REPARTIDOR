var express = require('express');
var bodyParse = require('body-parser');
var cors = require('cors');

var repartidoresRouter = require('./routers/repartidorese.router');
var ordenesRouter = require('./routers/ordenes.router');

var database = require('./modules/database');

var app  = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.use('/repartidores',  repartidoresRouter)
app.use('/ordenes', ordenesRouter)

app.get('/', function(req, res){
    res.send('Servidor en linea');
})

app.listen(3002, function(){
    console.log('Servidor levantado')
})