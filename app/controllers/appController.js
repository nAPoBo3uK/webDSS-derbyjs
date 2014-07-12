/**
 * Created by bolehivsky on 28.06.14.
 */
var service = {
    users: require('../services/usersService'),
    votings: require('../services/votingsService')
};

module.exports = function(app){
    app.get('/:ns', function(page, model, params, next){
        console.log('instance page');
        if(service[params.ns]){
            service[params.ns].main(page, model, params, next)
        } else next();
    });
    app.get({from:'/users*', to: '/votings*'},{
        forward: function ( model, params, next ) {
            console.log('from users ');
            model.del('_related.0');
            next();
        }
    })

    app.get({from:'/:ns*', to: '/:ns/new'},{
        forward: function ( model, params, next ) {
            console.log('forward '+params.ns+' new');
            model.set('_page.mode', 'new');
        }
    })

    app.get('/:ns/new', function(page, model, params, next){
        console.log('instance page new');
        if(service[params.ns]){
            service[params.ns].main(page, model, params, next);
            model.set('_page.mode', 'new');

        } else next();
    });

    app.get({from:'/users*', to: '/users/:id'},{
        forward: function ( model, params, next ) {
            console.log('forward id ' + params.id)
            if(params.id){
                service.users.view(model, params.id);
                model.set('_page.mode', 'view');
            } else {
                model.del('_page.mode');
            }
        }

    })
    app.get({from:'/votings*', to: '/votings/:id'},{
        forward: function ( model, params, next ) {
            console.log('forward id ' + params.id)
            if( params.id){
                service.votings.view(model, params.id);
                model.set('_page.mode', 'view');
            } else {
                model.del('_page.mode');
            }
        }

    })

    app.get('/users/:id', function(page, model, params, next){
        console.log('instance page with id');
          service.users.main(page, model, params, next, function(){
                service.users.view(model, params.id);
              model.set('_page.mode', 'view');
            })
    });
    app.get('/votings/:id', function(page, model, params, next){
        console.log('votings page with id');
        service.votings.main(page, model, params, next, function(){
            service.votings.view(model, params.id);
            model.set('_page.mode', 'view');
        })
    });





}

