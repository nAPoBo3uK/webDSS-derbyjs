/**
 * Created by bolehivsky on 08.06.14.
 */
var options = {
    static: __dirname + '/views/public'
};

var derby = require('derby');
var app = require(__dirname + '/src/app');

function createServer() {
    var server_port = options.port || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
    var server_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    var mongoUrl;
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
        mongoUrl = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    } else {
        mongoUrl = process.env.MONGO_URL
            || process.env.MONGOHQ_URL
            || 'mongodb://localhost:27017/web-dss';
    }

    var expressApp = require(__dirname + '/src/server/server.js').setup(app, mongoUrl);

    var server = require('http').createServer(expressApp);
    server.listen(server_port, function (e) {
        if(e) {
            console.log(e);
        } else console.log('%d listening. Go to: http://localhost:%d/', process.pid, server_port);
    });
}
derby.run(createServer);
