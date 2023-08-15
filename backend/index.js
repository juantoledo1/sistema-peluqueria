const express= require ('express');

const app = express();

const morgan = require ('morgan');
app.set('puerto', 2000);

app.use((morgan));

app.listen(app.get('puerto'), ()=>{
    console.log('el serv. esta corriendo perfectamente en el puerto', app.get('puerto'))
});