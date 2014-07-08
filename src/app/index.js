var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);
var votingMethods = require('./services/votingMethods');
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
app.use(require('./controllers/appController'));


app.component('list', require('./presentation/list'));
app.component('table', require('./presentation/table'));
app.component('table:vote', require('./presentation/votingTable'));
app.component('participants', require('./presentation/participants'));
app.on('model', function(model){
   /* model.on('all', '**', function (path, event, args) {
        console.log('onmodel')
        console.log(arguments);

    });*/
    model.fn('all', function(item) {
        return true;
    });

    model.fn('progress', function(votes){
        var model = this.model;
        var counter = 0;
        var all=0;
        for (var p in votes) {
            if(votes[p].vote) counter++;
            all++;
        }

    /*    if(counter===all) {
            var votes = [];
            for (var p in voters) {
                votes.push(voters[p].vote);
            }
            votingMethods(votes, function(result){
                model.set('votings.'+voting.id+'.results', result);
            });
        }*/

        return Math.floor(counter/(all/100));
    })
})