// ************ Require's liberies ************
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cors = require('cors');

// ************ Require's Middlewares ************
const userLoggedMiddlware = require('./middlewares/userLoggedMiddlware');
//const rememberMiddleware = require("./middlewares/rememberMiddleware");
//const localsMiddleware = require('./middlewares/localsMiddleware');

// ************ Routes ************
const rutasMain = require('./routes/main');
const adminRouter= require('./routes/admin');
const usersRouter = require('./routes/users'); 
const routsStudents = require('./routes/students');
const routTeachers = require('./routes/teachers');
// TODO
const cartRouter = require("./routes/carrito");
const apiRouter = require('./routes/api');

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares && View Engine Setup- (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); //Necesario para tener el req.body
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
  secret:"Secretoo breoo!!",
  resave: true ,
  saveUninitialized: true 
}));
app.use(cors());

app.use(userLoggedMiddlware);
// app.use(recordameMiddleware);
// app.use(localsMiddle);
 
// ************ Template Engine - (don't touch) ************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ************ Route System require and use() ************
app.use('/', rutasMain);
app.use('/users', usersRouter);
app.use('/students', routsStudents);
app.use('/teachers', routTeachers);
// TODO
// app.use("/admin" ,adminRouter);
app.use("/cart", cartRouter);
app.use('/api', apiRouter);

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

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

