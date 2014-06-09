var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);


global.app = app;

app.use(require('d-bootstrap'));

app.loadViews (__dirname + '/../../views');
app.loadStyles(__dirname + '/../../views/styles');

app.get('*', userExists);

app.get('/', function (page, model){
    page.render('home');
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