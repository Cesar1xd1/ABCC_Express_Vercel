'use strict';

const mysql = require('mysql');

const conexion = mysql.createConnection({
    host : 'sql5.freesqldatabase.com',
    user : 'sql5766435',
    password : 'xYErJDR8ZT',
    database : 'sql5766435'
});

conexion.connect(function(err){
    if(err) 
        throw err;
    console.log('Conexion a BD con EXITO!!!');

});
module.exports = conexion;