var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);


var usersController = require('./controllers/usersController');
var votingsController = require('./controllers/votingsController');
global.app = app;
global.derby = derby;

app.use(require('d-bootstrap'));

app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../styles');

app.component('table:editable', require('./presentation/table'));
app.component('list', require('./presentation/list'));
app.get('*', userExists);
app.get('*', function(page,model,params, next){
    if(params.query.action){
        model.at('_state.votings').set('mode', params.query.action);
    } else {
        model.del('_state.' + model.get('$render.ns' + '.selected'));
    }

    next();
})

app.get('/', function (page, model){
    page.redirect('votings');
});

app.get('/votings*', votingsController);
app.get('/users*', usersController);

app.get('/account', function (page, model){ page.render('account'); });
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

// TODO: make as event handler
app.proto.startVoting = function(id){
    console.log('startVoting '+id);
    //TODO:
}

// TODO: make as event handler
app.proto.addNew = function(namespace){
    console.log('addNew ' + namespace);
    var model = this.model;
    var newRecord = model.get('_state.'+ namespace +'.new');
    console.log(newRecord);
    if (!newRecord) return;
    newRecord.owner = model.get('_session.userId');
    switch(namespace){
        case 'votings':
            newRecord.timeCreated = (new Date()).getTime();
            break;
        case 'users':
            break;
    }

    model.add(namespace, newRecord);
    this.model.del('_state.'+ namespace +'.new');
    this.model.del('_state.'+ namespace +'.new');
};

app.proto.view = function(id){
    console.log()
    var entity = this.model.get('$render.ns');
    this.model.ref('_state.'+entity+'.selected', entity+'.' + id);
}


app.proto.delListItem = function(id){
    console.log('delList Item ' + id);
    this.model.del(this.model.get('$render.ns')+'.' + id);
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

