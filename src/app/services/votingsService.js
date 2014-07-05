/**
 * Created by bolehivsky on 05.07.14.
 */
module.exports = {
    main: function ( page, model, params, next) {
        /*  model.on('all', '**', function (path, event) {
         console.log('model.event');
         console.log(arguments);
         });*/
        console.log(params)
        var userVotings = model.query('votings',{'owner':model.get('_session.userId')}).subscribe(function(){
            userVotings.ref('_state.votings.list');
            page.render('votings');
        });

    }
}