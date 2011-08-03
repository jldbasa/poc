var express = require('express'),
    cloud = require('./cloud'),
    app = module.exports = express.createServer();

// configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// load engine
cloud(app);

// start the server
app.listen(8080);
console.log("API server listening on port %d in %s mode...", app.address().port, app.settings.env);
