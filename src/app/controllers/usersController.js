/**
 * Created by bolehivsky on 28.06.14.
 */
module.exports = function ( page, model, params, next) {
    var usersQuery = model.query('auths', {});
    usersQuery.subscribe(function(){
        usersQuery.ref('_page.list');
        switch(params.query.action){
            case 'view':
                model.set('_page.selectedUser', model.get('_page.usersList')[params.query.id]);
                break;
        }
        page.render('users');
    })
}