/**
 * Created by bolehivsky on 05.07.14.
 */
module.exports = {
    main: function ( page, model, params, next){
        var usersQuery = model.query('auths', {}).subscribe(function(){
            usersQuery.ref('_state.users.list');

            page.render('users');
        })
    }
}