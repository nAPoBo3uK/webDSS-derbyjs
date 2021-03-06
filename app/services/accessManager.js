/**
 * Created by bolehivsky on 01.07.14.
 */
module.exports = {
    validateSession: function userExists(page, model, params, next){
        console.log('derby get');
        if (model.get('_session.loggedIn')) {
            model.at('auths.'+model.get('_session.userId')).subscribe(function(){
                next();
            })
        } else if (params.url === '/registration' || params.url === '/registration/') {
            page.render('registration');
        } else page.render('login');
    }
}