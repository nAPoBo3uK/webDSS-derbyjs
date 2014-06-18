var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);
var tableEditable = require('./table-editable');

global.app = app;
global.derby = derby;


app.use(require('d-bootstrap'));

app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../styles');

app.component('votings:candidats', tableEditable);

app.get('*', userExists);


app.get('/', function (page, model){
    page.redirect('votings');
});
/*
app.get('/votings/:action', function (page, model, params, next){
    console.log(params);

    model.set('_page.selected','sdsdsdsd');

    //console.log(model.get());
    page.redirect('votings');

});*/

app.get('/votings', function (page, model, params, next){
    console.log(params)
    var userVotings = model.query('votings',{'owner':model.get('_session.userId')}).subscribe(function(){
        userVotings.ref('_page.votingsList');

        page.render('votings');
      //  next();
   });

});

app.get('/users', function (page, model, params){

    var usersQuery = model.query('auths', {});
    usersQuery.subscribe(function(){
        usersQuery.ref('_page.usersList');
        switch(params.query.action){
            case 'view':
                model.set('_page.selectedUser', model.get('_page.usersList')[params.query.id]);
                break;
        }
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


app.proto.addVoting = function(newVoting){
    console.log('addVoting '); console.log(newVoting);
    if (!newVoting) return;
    var model = this.model;
    var userId = model.get('_session.userId');
    var now = new Date();
    newVoting.timeCreated = now.getTime();
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

app.proto.setMode = function(mode){
    this.model.set('_page.mode', mode);
}
app.proto.view = function(id){
    console.log('view');
    var entity = this.model.get('$render.ns');
    this.setMode('view');
    this.model.ref('_page.selected', '_page.' + entity + 'List.' + id);


}

app.proto.formatDate = function(date){
    if(date){
        var d = new Date(date);

        var dd = d.getDate();
        if (dd<10) dd= '0'+dd;

        var mm = d.getMonth() + 1;  // месяц 1-12
        if (mm<10) mm= '0'+mm;

        var yy = d.getFullYear() % 100;
        if (yy<10) yy= '0'+yy;

        return dd+'.'+mm+'.'+yy;
    }

}

