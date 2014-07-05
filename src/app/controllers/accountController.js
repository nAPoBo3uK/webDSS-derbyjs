/**
 * Created by bolehivsky on 30.06.14.
 */
module.exports = function(app){
    app.get('/account', function (page, model){ page.render('account'); });
    app.get('/login', function (page){ page.redirect('/'); });
    app.get('/registration', function (page){ page.redirect('/'); });
}