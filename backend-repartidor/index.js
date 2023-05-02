var express = require('express');
var bodyParse = require('body-parser');
var cors = require('cors');


var app  = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send('Servidor en linea');
})

app.listen(3002, function(){
    console.log('Servidor levantado')
})