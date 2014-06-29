/**
 * Created by bolehivsky on 08.06.14.
 */
var derby = require('derby');
var app = require(__dirname + '/src/app');
var server = require(__dirname + '/src/server/server.js');
var http = require('http');

function createServer() {
    var server_port = process.env.PORT || 3000;
    var server_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

    var mongoUrl;

    mongoUrl = process.env.MONGO_URL
        || process.env.MONGOHQ_URL
        || 'mongodb://localhost:27017/web-dss';


    http.createServer(server.setup(app, mongoUrl))
        .listen(server_port, function (e) {
            if(e) {
                console.log(e);
            } else console.log('%d listening. Go to: http://localhost:%d/', process.pid, server_port);
        });
}
derby.run(createServer);
