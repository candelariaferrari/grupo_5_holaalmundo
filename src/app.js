// CONSTANTES

const createError = require('http-errors');
const cookies = require('cookie-parser');
const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override');                                                  // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const routesMain = require('./routes/main');
const routesStudents = require('./routes/students');
const routesTeachers = require('./routes/teachers');

// MÉTODOS 

app.use(express.static(path.join(__dirname, '../public')));                                          // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));                                                    // Necesario para obtener el req.body
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));                        
app.use(session({secret: 'Secreto',
                 resave: true ,
                 saveUninitialized: true}));
app.use(cookies());
app.use(userLoggedMiddleware);

// TEMPLATE ENGINE 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// RUTAS

app.use('/', routesMain);
app.use('/students', routesStudents);
app.use('/teachers', routesTeachers);

// TEMPLATE ENGINE 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// ERROR 404

app.use((req, res, next) => next(createError(404)));

// MANEJADOR DE ERRORES 

app.use((err, req, res, next) => {res.locals.message = err.message;
                                  res.locals.path = req.path;
                                  res.locals.error = req.app.get('env') === 'development' ? err : {};
                                  res.status(err.status || 500);
                                  res.render('error');});

// SERVIDOR

app.listen(3000, () => {console.log("Servidor corriendo en el puerto 3000!");});
