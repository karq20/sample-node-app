// set up ========================
var port = process.env.PORT || 8080;
var express  = require('express');
var app      = express();                         // create our app with express
var morgan = require('morgan');                   // log requests to the console
var bodyParser = require('body-parser');          // pull information from HTML POST
var methodOverride = require('method-override');  // simulate DELETE and PUT

// configuration 
mongoose.connect('mongodb://localhost:27017/tableau');     // connect to mongoDB database

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.listen(port);
console.log("App listening on port " + port);

// routes

app.all("/api/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

// application

app.get('/api/tableau', function(req, res) {
  res.sendFile('public/index.html', { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
});

