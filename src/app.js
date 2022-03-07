// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); //Necesario para tener el req.body
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const rutasMain = require('./routes/main');
const rutasEstudiantes = require('./routes/estudiantes');
const rutasProfesores = require('./routes/profesores');
// const rutasServicios = require('./routes/servicios');


app.use(session({
  secret:"Secretoo breoo!!",
  resave: true ,
  saveUninitialized: true 
}));
app.use('/', rutasMain);
app.use('/estudiantes', rutasEstudiantes);
app.use('/profesores', rutasProfesores);

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ Servidor ************

app.listen(3000, () => { 
    console.log("Servidor corriendo en puerto 3000");
});

