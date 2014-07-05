var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);

global.app = app;
global.derby = derby;

app.use(require('d-bootstrap'));
app.use(require('./infrastructure'));

app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../styles');



app.use(require('./controllers/accessController'));
app.use(require('./controllers/accountController'));
app.get('/', function (page, model){
    page.redirect('votings');
});
app.use(require('./controllers/votingsController'));
app.use(require('./controllers/usersController'));



app.component('list', require('./presentation/list'));
app.component('table:editable', require('./presentation/table'));
app.on('model', function(model){
    model.on('all', '**', function (path, event, args) {
        console.log('onmodel')
        console.log(arguments);

    });

    ;
})