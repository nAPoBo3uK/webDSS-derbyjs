var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);


global.app = app;

app.use(require('d-bootstrap'));


app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../styles');

app.get('*', userExists);

app.get('*', setAction);
app.get('/', function (page, model){
    page.redirect('voting');
});

app.get('/voting', function (page, model, params){



   switch(params.query.action){
        case 'new':
            break;
        case 'view':
            model.ref('_page.voting','votings.' + params.query.id)
            break;
    }

    var userVotings = model.query('votings',{'owner':model.get('_session.userId')}).subscribe(function(){
        userVotings.ref('_page.votings.own');
        page.render('voting');
    });


});


app.get('/users', function (page, model, params){
    var usersQuery = model.query('auths', {});
    usersQuery.subscribe(function(){
        usersQuery.ref('_page.usersList.other');
        page.render('users');
    })

});

app.get('/account', function (page, model){
    page.render('account');
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

function setAction(page, model, params, next){
    model.set('_page.mode', params.query.action);
    next();
}
app.proto.addVoting = function(newVoting){
    console.log('addVoting '); console.log(newVoting);
    if (!newVoting) return;
    var model = this.model;
    var userId = model.get('_session.userId');
    newVoting.timeCreated = new Date();
    newVoting.owner = [userId];
    model.add('votings', newVoting);
    this.model.set('_page.newVoting', '');
};


app.on('model', function(model) {
    model.fn('getKeys', function(obj) {
        if(obj) return Object.keys(obj);
    });

});
// votinglist
app.proto.delVoting = function(votingId){
    console.log('delVoting'); console.log(votingId);
   this.model.del('votings.' + votingId);

}
app.proto.toLocaleString = function(date){
    if(date){
        var d = Date(date);
        console.log(date);
       // return date.getDay()+'/'+date.getMounth()+'/'+date.getYear();
        return date+'';
    }

}

app.proto.redirect=function(path){
    document
}