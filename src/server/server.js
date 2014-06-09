// Express 4
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var authMiddleware = require('./auth');
// Derby
var derby = require('derby');

var racerBrowserChannel = require('racer-browserchannel');
var liveDbMongo = require('livedb-mongo');

derby.use(require('racer-bundle'));

exports.setup = function (app, options) {
    var mongoUrl = process.env.MONGO_URL || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/web-dss';
    var store = derby.createStore({db: liveDbMongo(mongoUrl + '?auto_reconnect', {safe: true})});

    var expressApp = express();

    // Respond to requests for application script bundles
    expressApp.use(app.scripts(store));

    options && options.static
        && expressApp.use(require('serve-static')(options.static));

    expressApp.use(racerBrowserChannel(store));
    expressApp.use(store.modelMiddleware());

    expressApp.use(require('cookie-parser')());
    expressApp.use(session({
        secret: process.env.SESSION_SECRET || 'YOUR SECRET HERE'
        , store: new MongoStore({url: mongoUrl})
    }));

    expressApp.use(require('body-parser')());
    expressApp.use(require('method-override')());

    expressApp.use(authMiddleware(store));

    expressApp.use(app.router());


    expressApp.all('*', function(req, res, next) {
        res.status(404).send('404: ' + req.url);
       }
    );

    return expressApp;
}


/*
function createUserId(req, res, next) {
    var model = req.getModel();
    var userId = req.session.userId;
    if (!userId) userId = req.session.userId = model.id();
    model.set('_session.userId', userId);
    next();
}*/