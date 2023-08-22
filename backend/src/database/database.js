// conectamos a la base de datos 
const mysql=require('mysql');
const mysqlconect= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'cypresshill1',
    database: 'barber'
});



// comprobamos si hay un errror o no
mysqlconect.connect(function(error){
    if(error){
        console.log("hay nun errot")
        return;
    }else{
        console.log("se conecto a la base de datos")
    }
});

// exportamos 
module.exports= mysqlconect;