/**
 * Created by bolehivsky on 05.07.14.
 */
module.exports = {
    main: function ( page, model, params, next, cb) {
        var userVotings = model.query('votings',{'owner':model.get('_session.userId')}).subscribe(function(){
            userVotings.ref('_page.list');
            if(cb) cb(page, model, params, next);
           /* model.subscribe('auths',function(e){
                if(e)console.log(e);
                var filter = model.filter('auths', 'participants')
                filter.ref('_page.participants');

            });*/
            page.render('votings');
        });


    },
    view: function (model, id) {

        if(model.get('votings.' + id))
            model.ref('_page.view', 'votings.' + id);


    }


}