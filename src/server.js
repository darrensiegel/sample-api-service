var express    = require('express');        // call express
var bodyParser = require('body-parser');
var mysql = require('mysql');

var createProviderFor = require('./database/provider');
var buildRouter = require('./routes/builder');

var context = {
  app: express(),
  port: process.env.PORT || 8080,
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'authorization',

  // Extending the REST endpoints involves add/removing to these
  // two properties of our application's context.  If we wanted
  // to have a REST endpoint for table 'item_edge', we simply add
  // 'item_idge' to the following resources array.    
  resources: ['actor', 'action', 'item', 'authorization'],
  customizedResources: ['authorization']
};

var configureServer = function(context) {
  const { app } = context;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CORS configuration
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  return Promise.resolve(context);
}

var customizeRoutes = function(context) {

  const { customizedResources, routers } = context;

  customizedResources.forEach(resource => {
    const router = routers[resource];
    const customProvider = require('./database/' + resource);
    const customize = require('./routes/' + resource);
    customize(context, router, customProvider);
  })

  return Promise.resolve(context);
}

var installDefaultRoutes = function(context) {

  const { connection, app, resources } = context;

  // Build all the routers
  const routers = {}
  resources.forEach(resource => {
    routers[resource] = buildRouter(createProviderFor(connection, resource))
  });

  // Then install the routers in the app
  Object.keys(routers).forEach(resource => app.use('/' + resource, routers[resource]));

  // Augment the application context with the created routers
  return Promise.resolve(Object.assign({}, context, {routers}));
}

var startServer = function(context) {
  const { app, port } = context;
  app.listen(port);

  return Promise.resolve(context);
}

// Connect to the database, retry a half second later if the connection fails
var initDatabase = function(context, initialResolve) {

  console.log("Attempting connection to database");

  let con = mysql.createConnection({
    host: context.host,
    user: context.user,
    password: context.password,
    database: context.database
  });

  return new Promise(function(resolve, reject) {
    con.connect(function(err){
      if (err) {
        console.log("...Error connecting: " + err);
        setTimeout(() => initDatabase(context,
          initialResolve === undefined ? resolve : initialResolve), 500);
      } else {
        if (initialResolve !== undefined) {
          initialResolve(Object.assign({}, context, { connection: con}));
        } else {
          resolve(Object.assign({}, context, { connection: con}));
        }
      }
    });
  });
}

var init = function(context) {

  console.log('starting api service')

  initDatabase(context)
    .then(context => configureServer(context))
    .then(context => installDefaultRoutes(context))
    .then(context => customizeRoutes(context))
    .then(context => startServer(context))
    .then(context => console.log('api service up and running'))
    .catch(err => console.log(err));
}

init(context);
