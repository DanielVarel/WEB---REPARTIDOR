var express = require('express');
var router = express.Router();
var ordenes = require('../models/ordenes');

// obtener a todas las ordenes
router.get('/', function(req, res){
    ordenes.find({status:0}).then(result =>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

// cuando un repartidor acepta la orden
router.put('/:_id', function(req, res){

    const {status} = req.body;

    ordenes.updateOne({_id: req.params._id}, {$set: {status: status}}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send('error');
        res.end()
    })

    // repartidor.updateOne({_id: idRepartidor}, {$push: {pendiente: u}}).then(result =>{
    //     res.send(result);   
    //     res.end();
    // }).catch(error=>{
    //     res.send(error);
    //     res.end();
    // })
    
})

module.exports = router;