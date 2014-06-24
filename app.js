/**
 * Created by bolehivsky on 08.06.14.
 */
var options = {
    static: __dirname + '/views/public'
};

var derby = require('derby');

function createServer() {
    var port = options.port || process.env.PORT || process.env.OPENSHIFT_APP_PORT || 3000;
    var app = require(__dirname + '/src/app');
    var expressApp = require(__dirname + '/src/server/server.js').setup(app, options);
    var server = require('http').createServer(expressApp);
    server.listen(port, function (e) {
        if(e) {
            console.log(e);
        } else console.log('%d listening. Go to: http://localhost:%d/', process.pid, port);
    });
}
derby.run(createServer);
