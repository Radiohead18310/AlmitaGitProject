const express= require('express');
const morgan = require('morgan');
const path= require('path');
const mysql= require('mysql');
const bodyParser= require('body-parser');
const myConnection= require('express-myconnection');
const handlebars= require ('express-handlebars');
const session = require('cookie-session');
const app= express();

app.set('trust proxy', 1);
app.use(session({
    secret: 'clave secretosa',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//-------------------------------------Configuracion del puerto----------------------------------------------------------------
app.set('port', process.env.PORT || 3211);
//-------------------------------------Configuracion del engine de plantillas------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//------------------------------------Configuracion de Midlewares------------------------------------------------

app.use(morgan('dev'));
//////////////////////Conneccion con mysql///////////////////
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    port: 3306,
    database: 'BaseGit'
}, 'single'));
app.use('/', require(path.join(__dirname, 'routes/routes')));
app.use(express.static(path.join(__dirname, 'public')));
//------------------------------------ABRIENDO EL SERVER----------------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log(`SERVER IN PORT ${app.get('port')}`);
});
