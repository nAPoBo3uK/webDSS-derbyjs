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
    model.on('all', 'votings.*.participants.*.vote', function (votingId, userId, event, action) {
        console.log('onmodel')
        if(event === 'change') {
            if(model.get('_page.progress') == 100){
                var voters = model.get('votings.'+votingId+'.participants');
                var votes = [];
                for (var p in voters) {
                    votes.push(voters[p].vote);
                }
                votingMethods(votes, function(result){
                    console.log(result);
                    model.set('votings.'+votingId+'.results', result);
                });
                model.set('votings.'+votingId+'.dateFinished', (new Date()).getTime());
            }
        }
        console.log(arguments);

    });
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


        }*/

        return Math.floor(counter/(all/100));
    })
})