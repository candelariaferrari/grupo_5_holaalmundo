// ************ Require's ************
const createError = require('http-errors');
const cookies = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const userLoggedMiddlware = require('./middlewares/userLoggedMiddlware');
const rutasMain = require('./routes/main');
const routsStudents = require('./routes/students');
const routTeachers = require('./routes/teachers');
// ************ express() - (don't touch) ************
const app = express();
// ************ Template Engine - (don't touch) ************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ************ Middlewares - (don't touch) ************

app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); //Necesario para tener el req.body
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(session({
  secret:"Secretoo breoo!!",
  resave: true ,
  saveUninitialized: true 
}));

app.use(cookies());

app.use(userLoggedMiddlware);

// ************ Route System require and use() ************


app.use('/', rutasMain);
app.use('/students', routsStudents);
app.use('/teachers', routTeachers);

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/'));

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

