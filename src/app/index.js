var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);


global.app = app;

app.use(require('d-bootstrap'));


app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../styles');

app.get('*', userExists);

app.get('/', function (page, model){
    page.redirect('voting');
});

app.get('/voting', function (page, model, params){
    switch(params.query.action){
        case 'new':
            break;
        case 'view':
            model.set('_page.voting','Voting' + params.query.id);
            break;
    }
    model.subscribe('votings',function(){
        model.filter('votings','all').ref('_page.votings');
        page.render('voting');
    })

});


app.get('/users', function (page, model){
    page.render('users');
});

app.get('/login', function (page){ page.redirect('/'); });
app.get('/registration', function (page){ page.redirect('/'); });

function userExists(page, model, params, next){
    console.log('derby get');
    console.log(params);
    var user = 'auths.' + model.get('_session.userId');
    if (model.get(user)) {
        model.subscribe(user, function () {
            model.ref('_page.user', user);
            next();
        });
    } else if (params.url === '/registration' || params.url === '/registration/') {
        page.render('registration');
    } else page.render('login');
}

app.proto.addVoting = function(newVoting){
    console.log('addVoting ');
    console.log(newVoting);
    if (!newVoting) return;
    var model = this.model;
    newVoting.timeCreated = new Date();
    newVoting.role = 'Менеджер';
    var userVotings = model.at('auths.' + model.get('_session.userId') +'.votings');
   userVotings.push(model.at('votings.' + model.add('votings', newVoting)));


    this.model.set('_page.newVoting', '');
};


app.on('model', function(model) {
    model.fn('all', function() { return true; });

});

app.proto.toLocaleString = function(date){
    if(date)
        return date;
}