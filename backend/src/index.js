//usamos libreria express para levantar nuesto server
const express= require ('express');

//llamamos app a las funciones que tenemos dentro de express
const app = express();

// asignamos la constante de morgan en puerto 2000
const morgan = require ('morgan');
app.set('puerto', 2000);



/*prueba de ruteo 
app.get('/', (req,res)=>{
    res.send('hola hola')
})
*/


app.listen(app.get('puerto'), ()=>{
    console.log('server iniciado', app.get('puerto'))
});

app.use(require('./routes/routes'))