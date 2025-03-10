'use strict';

const Alumno = require('../models/alumno');



//----- Crear nuevo alumno -----
exports.create = function(req, res){
    console.log(req.body.Num_Control);
    console.log(req.body.Nombre);
    console.log(req.body.PrimerAp);
    console.log(req.body.SegundoAp);
    console.log(req.body.Fecha_Nac);
    console.log(req.body.Semestre);
    console.log(req.body.Carrera);

    //Verificar que no esten vacios los campos
    if(req.body.constructor === Object && Object.keys(req.body).length === 0 ){
        res.status(400).send({error: true, message: 'Falta informacion'});
    }else{
        const a = {
            Num_Control : req.body.Num_Control,
            Nombre : req.body.Nombre,
            PrimerAp : req.body.PrimerAp,
            SegundoAp : req.body.SegundoAp,
            Fecha_Nac : req.body.Fecha_Nac,
            Semestre : req.body.Semestre,
            Carrera : req.body.Carrera 
        }

        const alumno = new Alumno(a);

        Alumno.create(alumno, function(err, alumno){
            console.log("Guardando alumno", req.body);
            if(err)
                res.send(err);

            req.flash('message', 'Alumno AGREGADO con EXITO!');
            res.redirect('/')
        });
    }
};

//----- Eliminar un alumno -----
exports.delete = function(req, res){
    Alumno.delete(req.params.id, function(err){
        if(err)
            res.send(err);

        req.flash('message', 'Alumno ELIMINADO con EXITO!');
        res.redirect('/')
    });
};

//----- Modificar alumno -----
exports.update = function(req, res) {
    Alumno.findById(req.params.id, function(err, alumno) {    

      console.log("actualizar: " + req.body.num_control);
      console.log("actualizar: " + req.body.nombre);
      console.log("actualizar: " + req.body.primer_ap);
      console.log("actualizar: " + req.body.segundo_ap);
      console.log("actualizar: " + req.body.fecha_nac);
      console.log("actualizar: " + req.body.semestre);
      console.log("actualizar: " + req.body.carrera);
    
      const a = {
        Num_Control : req.body.Num_Control,
        Nombre : req.body.Nombre,
        PrimerAp : req.body.PrimerAp,
        SegundoAp : req.body.SegundoAp,
        Fecha_Nac : req.body.Fecha_Nac,
        Semestre : req.body.Semestre,
        Carrera : req.body.Carrera  
    }

      Alumno.update(req.params.id, new Alumno(a), function(err, alumno) {      
        req.flash('message', 'Alumno ACTUALIZADO Correctamente !');
        res.redirect('/');
      });
    });     
  
};

//----- Mostrar TODOS los alumnos en la vista principal -----
exports.findAll = function(req, res){
    Alumno.findAll(function(err, alumnos){
        if(err)
            res.send(err);

        console.log("Alumno: ", alumnos);
        res.status(200).send(alumnos);
    });
};
//Buscar un Alumno
exports.findById = function(req, res){
    Alumno.findById(req.params.id, function(err, alumno){
        if(err)
            res.send(err);

        res.json(alumno);
    });
};