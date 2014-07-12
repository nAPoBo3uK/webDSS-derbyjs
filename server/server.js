
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var authMiddleware = require('./auth');
var path = require('path');

// Derby
var derby = require('derby');
var derbyApp = require('../app');
var express = require('express');
var racerBrowserChannel = require('racer-browserchannel');
var liveDbMongo = require('livedb-mongo');

derby.use(require('racer-bundle'));


module.exports =  function (expressApp, mongoUrl, sessionSecret) {
    var store = derby.createStore({db: liveDbMongo(mongoUrl + '?auto_reconnect', {safe: true})});



    // Respond to requests for application script bundles
    expressApp.use(derbyApp.scripts(store));

    expressApp.use(racerBrowserChannel(store));
    expressApp.use(store.modelMiddleware());
    expressApp.use(express.static(path.join(__dirname, '../../public')));
    expressApp.use(require('cookie-parser')());
    expressApp.use(session({
        secret: sessionSecret || 'YOUR SECRET HERE',
         store: new MongoStore({url: mongoUrl})
    }));

    expressApp.use(require('body-parser')());
    expressApp.use(require('method-override')());

    expressApp.use(authMiddleware(store));

    expressApp.use(derbyApp.router());


    expressApp.all('*', function(req, res, next) {
        res.status(404).send('404: ' + req.url);
       }
    );

    return expressApp;
}
