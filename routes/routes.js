const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
    res.render('layouts/inicio');
});
router.get('/Registro',(req,res)=>{
    res.render('layouts/Registro');
});
router.get('/Inicio',(req,res)=>{
    if(req.session.nom_usu==undefined){
        console.log('no inicio session');
        res.redirect('/')
    }else{
        console.log(' session');
        console.log(req.session.nom_usu);
        res.render('layouts/UwU');
    }
});
router.post('/Registro',(req,res)=>{
    let nombre=req.body.nombre;
    console.log(nombre);
    let app=req.body.app_usu;
    let apm=req.body.apm_usu;
    let correo=req.body.email;
    let pass=req.body.pass;
    let usuario={
        "nom_usu":nombre,
        "app_usu":app,
        "apm_usu":apm,
        "cor_usu":correo,
        "pass_usu":pass

    }
    console.log(usuario);
    req.getConnection((err,conn)=>{
        conn.query('select * from User where cor_usu=? and pass_usu=?',[correo,pass],(err1,row)=>{
            if(err1)console.log('ERR:',err1);
            if(row.length>0){
                console.log('ño')
            }else{
                conn.query('insert into User set ?',usuario,(err,usu)=>{
                    if(err)console.log('ERR:',err);
                    res.redirect('/');
                });

            }
        });
       
    });
});
router.get('/logout',(req,res)=>{
    req.session.nom_usu=undefined;
    req.session.email=undefined;
    req.session.app_usu=undefined;
    req.session.apm_usu=undefined;   
    res.redirect('/Inicio'); 
});
router.post('/ISession',(req,res)=>{
    let cor=req.body.email;
    let  pass=req.body.pass;
    console.log(cor,pass);
    req.getConnection((err,conn)=>{
        conn.query('select * from User where cor_usu= ? and pass_usu= ?;' ,[cor, pass],(err1,row)=>{
            if(err1)console.log('ERR:',err1);
            console.log(row);
            console.log(row.length);
            if(row.length>0){
                row.forEach(usu => {
                req.session.nom_usu=usu.nom_usu;
                req.session.email=usu.cor_usu;
                req.session.app_usu=usu.app_usu;
                req.session.apm_usu=usu.apm_usu;
                });
                console.log('si existe');
                res.redirect('/Inicio');

            }else{
                console.log('no existe');
                res.redirect('/');

            }

        });
    });


})
module.exports = router; 