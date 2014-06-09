var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);


global.app = app;

app.use(require('d-bootstrap'));

app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../views/styles');

app.get('*', userExists);

app.get('/', function (page, model){
    page.redirect('voting');
});

app.get('/voting', function (page, model, params){


   model.subscribe('todos', function(){

    page.render('voting');
   })

});
app.get('/voting/new', function (page, model){
    page.render('voting');
});

app.post('/voting/new', function (page, model){
 page.render('voting');

});
app.get('/voting/:id', function (page, model, params){
    model.set('_page.voting','Voting' + params.id);
    page.render('voting');
});
app.get('/users', function (page, model){
    page.render('users');
});

app.get('/login', function (page, model){
    page.redirect('/');
});
app.get('/registration', function (page, model){
    page.redirect('/');
});

function userExists(page, model, params, next){
    console.log('derby get');
    console.log(params);
     var user = 'auths.' + model.get('_session.userId');
     if(model.get(user)){
         model.subscribe(user, function(){
            model.ref('_page.user', user);
            next();
        });
     } else if(params.url === '/registration' || params.url === '/registration/') {
        page.render('registration');
     } else page.render('login');


}