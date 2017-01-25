// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// CONFIG //
var config = require('./config');

// CONTROLLERS //
var toDoCtrl = require('./controllers/toDoCtrl');
var UserCtrl = require('./controllers/UserCtrl');
var waterfallCtrl = require('./controllers/waterfallCtrl');

// SERVICES //
var passport = require('./services/passport');


// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

// function ensureLoggedIn(req, res, next){
//    if (!req.user){
//       return res.status(403).send("You must be logged in to use this");
//    }
//    next();
// }

// EXPRESS //
var app = express();

app.use(express.static(__dirname + './../public')); //serves up front end files
app.use(bodyParser.json());

// SESSION AND PASSPORT
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT ENDPOINTS
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});



// USER ENDPOINTS
app.post('/addToDo', isAuthed, toDoCtrl.createToDo);
app.get('/getToDo', isAuthed, toDoCtrl.readToDo);
app.put('/updateToDo/:id', isAuthed, toDoCtrl.update);
app.delete('/deleteToDo/:id', isAuthed, toDoCtrl.deleteToDo);

app.post('/register', UserCtrl.register);
app.get('/user', UserCtrl.read);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/user/:_id', isAuthed, UserCtrl.update);

app.post('/waterfall', waterfallCtrl.waterfallCalc);

// CONNECTIONS //
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});
