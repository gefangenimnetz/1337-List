var sys = require('sys');
var express = require('express');
var cradle = require('cradle');

var db = new(cradle.Connection)('https://gin.fornax.uberspace.de', 21955, {auth: { username: 'gin_couchadmin', password: 'biwenLid0' }}).database('todoapp');
var app = express.createServer();

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
});

app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Index
app.get('/', function(req, res){
  res.render('index');
});

// Alle Listen (für den jeweiligen User)
app.get('/lists/', function(req, res){
  db.get('4e60b618682323e63353effd9e00078a', function (err, doc) {
    if(err){
      res.render('lists', {flash: 'shit!'});
    } else {
      res.render('lists', {flash: 'wohoooooo, connection established!'});
    }
  });
});

// Cloud9 special Port and host
if (process.env.C9_PORT) {
  app.listen(process.env.C9_PORT, '0.0.0.0');
} else {
  app.listen(13337);
}