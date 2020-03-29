const express= require('express');
const morgan = require('morgan');
const path= require('path');
const myConnection= require('express-myconnection');
const handlebars= require ('express-handlebars');
const session = require('cookie-session');
const app= express();
//-------------------------------------Configuracion del puerto----------------------------------------------------------------
app.set('port', process.env.PORT || 5000);
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
app.use(express.json());
app.use(morgan('dev'));
app.use('/', require(path.join(__dirname, 'routes/routes')));
app.use(express.static(path.join(__dirname, 'public')));
//------------------------------------ABRIENDO EL SERVER----------------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log(`SERVER IN PORT ${app.get('port')}`);
});
