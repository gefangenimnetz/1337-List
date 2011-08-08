var sys = require('sys');
var express = require('express');

var app = express.createServer();

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
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
  res.render('index.jade', {layout: false});
});

// Alle Listen (für den jeweiligen User)
app.get('/lists/', function(req, res){
  res.render('lists.jade', {layout: false}); 
});

app.listen(process.env.C9_PORT, '0.0.0.0');