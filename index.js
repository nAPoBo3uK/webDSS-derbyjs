/**
 * Created by bolehivsky on 08.06.14.
 */
var derby = require('derby');
var express = require('express');
var initServer = require(__dirname + '/server/server.js');
var https = require('https');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');


derby.run(function () {
    // options
    var serverPort = process.env.PORT || 3000,
        httpsPort =  process.env.HTTPS_PORT || (parseInt(serverPort)+1),
        serverIp = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
        mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/web-dss',
        sessionSecret = process.env.SESSION_SECRET, //|| crypto.randomBytes(16).toString(),
        key = process.env.KEY || 'server.key',
        cert = process.env.PEM || 'server.pem';

    var expressAppHTTP = express();
    try {
        var httpsOptions = {
            key: fs.readFileSync(key),
            cert: fs.readFileSync(cert),
            requestCert: true
        };

        expressAppHTTP.get('*', function(req,res){
            res.redirect('https://' + serverIp + ':' + httpsPort + req.url);
        });
        var expressAppHTTPS = express();
        https.createServer(httpsOptions,  initServer(expressAppHTTPS, mongoUrl, sessionSecret))
            .listen(httpsPort); // sequred server
    } catch (e){
        console.log(e.message);
        console.log('No certificate. HTTPS connection unavailable.')
        initServer(expressAppHTTP, mongoUrl, sessionSecret);
    }
    http.createServer( expressAppHTTP ).listen(serverPort, function (e) {
        if(e) {
            console.log(e);
        } else console.log('%d listening. Go to: http://localhost:%d/', process.pid, serverPort);
    });
})

