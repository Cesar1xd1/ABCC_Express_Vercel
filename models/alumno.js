'use strict';

const conexion = require('../config/database');

let Alumno = function(alumno){
    this.Num_Control = alumno.Num_Control;
    this.Nombre = alumno.Nombre;
    this.PrimerAp = alumno.PrimerAp;
    this.SegundoAp = alumno.SegundoAp;
    this.Fecha_Nac = alumno.Fecha_Nac;
    this.Semestre = alumno.Semestre;
    this.Carrera = alumno.Carrera; 
};



// ======= Logica para BD Relacional =====
// --- ALTAS ----
Alumno.create = function (alumno, result) {
console.log("AQUI: " + alumno);

    conexion.query("INSERT INTO alumnos SET ?", alumno, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

// ----- BAJAS -----
Alumno.delete = function(nc, result){
    conexion.query("DELETE FROM alumnos WHERE Num_Control = ?", [nc], function(err, res){
        if(err){
            console.log('Error: ', err);
            result(err, null);
       }else{
           console.log(res);
           result(null, res);
       }
    });
};

//----- CAMBIOS 
Alumno.update = function(id, alumno, result){

    console.log("---------->", alumno);


    conexion.query("UPDATE alumnos SET Nombre=?, PrimerAp=?, SegundoAp=?, Fecha_Nac=?, Semestre=?, Carrera=? WHERE Num_Control=?",
        [alumno.nombre, alumno.PrimerAp, alumno.SegundoAp, alumno.Fecha_Nac, 
            alumno.Semestre, alumno.Carrera, alumno.Num_Control], function(err, res){
                if(err){
                    console.log('Error: ', err);
                    result(null, err);
               }else{
                   console.log(res);
                   result(null, res);
               }
            });
};

//----- CONSULTAS -----
Alumno.findById = function(nc, result){
    conexion.query("SELECT * FROM alumnos WHERE Num_Control=?", nc, function(err,res){
        if(err){
            console.log('Error: ', err);
            result(null, err);
       }else{
           console.log(res);
           result(null, res);
       }
    });
};

Alumno.findAll = function(result){
    conexion.query("SELECT * FROM alumnos", function(err,res){
        if(err){
            console.log('Error: ', err);
            result(null, err);
       }else{
           console.log(res);
           result(null, res);
       }
    });
};

module.exports = Alumno;