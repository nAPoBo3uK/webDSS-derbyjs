/**
 * Created by bolehivsky on 28.06.14.
 */
var service = {
    users: require('../services/usersService'),
    votings: require('../services/votingsService')
};

module.exports = function(app){
    app.get({from:'/:ns*', to: '/:ns/new'},{
        forward: function ( model, params, next ) {
            console.log('forward new');
            model.set('_page.mode', 'new');
        }
    })

    app.get({from:'/:ns*', to: '/:ns/:id'},{
        forward: function ( model, params, next ) {
            console.log('forward id ')
            console.log(params);
            if(service[params.ns]){
                service[params.ns].view(model, params.id);
                model.set('_page.mode', 'view');
            } else {
                model.del('_page.mode');
            }
        }

    })
  /*  app.get({from:'/votings/:id', to: '/users*'},{
        forward: function ( model, params, next ) {
            console.log('from votings ');
            var votingId = params.previous.split('/')[2];

            model.set('_related.voting',votingId);



            next();
        }
    })*/
    app.get('/:ns*', function(page, model, params, next){
        console.log(params);
        if(service[params.ns]){
            service[params.ns].main(page, model, params, next)
        } else next();
    });
  /*  app.get('/:ns/:id', function(page, model, params, next) {
        if(service[params.ns] && service[params.ns].options) {
            service[params.ns].main(page, model, params, next);
        } else next();
    });

*/
}

