
/**
 * Module dependencies.
 */

var express = require('express')
  , person = require('./routes/Person')
   , customer = require('./routes/Customer')
  , http = require('http')
  , path = require('path');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/Person', person.get);
app.get('/Person/:id', person.get);
app.post('/Person', person.post);
app.put('/Person/:id', person.put);
app.del('/Person/:id', person.del);

app.get('/Customer', customer.get);
app.get('/Customer/:id', customer.get);
app.post('/Customer', customer.post);
app.put('/Customer/:id', customer.put);
app.del('/Customer', customer.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
