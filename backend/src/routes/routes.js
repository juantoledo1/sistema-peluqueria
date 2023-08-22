// declaramos la constante express y en la siguiente linea en de vez de app=express,  ponemos routes=express p
const express= require ('express');
const router = express();
const mysqlconect= require('../database/database')
// router(require('../database/database'));

router.get('/ruta1',(req,res)=>{
    res.send('hola, probando ruta1')
});



router.get('/ruta2',(req,res)=>{
    res.send('hola, probando ruta2')
});


router.get('/ruta3',(req,res)=>{
    res.send('hola, probando ruta3')
});


router.get('/ruta4',(req,res)=>{
    res.send('hola, probando ruta4')
});



//hacemos exportable este archivo routes
module.exports= router;