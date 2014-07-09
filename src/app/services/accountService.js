/**
 * Created by bolehivsky on 09.07.14.
 */
module.exports = {
    account: viewAccount,
    login: login_registration,
    registration: login_registration
}


function viewAccount ( page, model, params, next ) {
    var userId = model.get('_session.userId');
    var user = model.at('auths.'+userId).subscribe(function(){
        model.ref('_page.user','auths.'+userId);
        page.render('account');
    })
}

function login_registration ( page, model, params, next ) {
    page.redirect('/');
}