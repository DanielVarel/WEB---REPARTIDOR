var express = require('express');
var router = express.Router();
var repartidores = require('../models/repartidores');

// obtener a todos los repartidores
router.get('/', function(req, res){
    const email= req.query.email;
    const password= req.query.password;
    
    repartidores.find({email:email, password:password, authenticated:true}).then(result =>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

// agregar un usuario
router.post('/',function(req, res){
    let u = new repartidores({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        authenticated: false,
        phoneNumber: req.body.phoneNumber,
        pendiente: [],
        historial: []     
    });
    
    u.save().then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send('hubo un erro al guardar');
        res.end()
    })

})



// agragar entrega para hacer
router.put('/:_id', function(req, res){
    
    const orden = req.body;

    // const u = orden[0];

    repartidores.updateOne({_id: req.params._id}, {$push: {pendiente: orden}}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})

router.put('/:_id/cambiar', function(req, res){
    const idOrden = req.body._idOrden;

    const orden = req.body;

    // const u = orden[0];

    repartidores.updateOne({_id: req.params._id}, {$push: {historial: orden}}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})

router.put('/:_id/eliminar', function(req, res){
    const idOrden = req.body._idOrden;

    const orden = req.body;

    repartidores.updateOne({_id: req.params._id}, {$unset: {pendiente: ""}}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})




module.exports = router;