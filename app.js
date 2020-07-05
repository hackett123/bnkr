'use strict';

var envvar = require('envvar');
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser');

var APP_PORT = envvar.number('APP_PORT', 8000);


var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUnitialized: false,
    secret: "don't tell!"
}))

var routes = require('./routes/routes.js')
var user_routes = require('./routes/user_routes.js')
var plaid_routes = require('./routes/plaid_routes.js')

app.get('/', routes.get_splash)
app.get('/login', routes.get_login)
app.get('/home', routes.get_home)
app.post('/set_message', routes.set_message)
app.get('/get_message', routes.get_message)

// user routes
app.post('/login', user_routes.login)
app.get('/get_user', user_routes.get_user)

// plaid routes
// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/get_access_token', plaid_routes.get_access_token);
app.get('/item', plaid_routes.item)
// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
app.get('/balance', plaid_routes.balance)
  

app.listen(APP_PORT, () => console.log('bnkr server listening on port ' + APP_PORT));