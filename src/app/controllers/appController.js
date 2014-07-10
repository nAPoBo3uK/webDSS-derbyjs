/**
 * Created by bolehivsky on 28.06.14.
 */
var service = {
    users: require('../services/usersService'),
    votings: require('../services/votingsService')
};

module.exports = function(app){

    app.get({from:'/users*', to: '/votings*'},{
        forward: function ( model, params, next ) {
            console.log('from users ');
            model.del('_related.voting');
            next();
        }
    })
    app.get({from:'/:ns*', to: '/:ns/new'},{
        forward: function ( model, params, next ) {
            console.log('forward '+params.ns+' new');
            model.set('_page.mode', 'new');
        }
    })



    app.get({from:'/:ns*', to: '/:ns/:id'},{
        forward: function ( model, params, next ) {
            console.log('forward id ' + params.id)
            if(service[params.ns] && params.id){console.log('@');console.log( service[params.ns]);
                service[params.ns].view(model, params.id);
                model.set('_page.mode', 'view');
            } else {
                model.del('_page.mode');
            }
        }

    })/*
function viewVotingById ( model, params, next ) {

        service.votings.view(model, params.id);
        model.set('_page.mode', 'view');
    }
    app.get({from:'/votings', to: '/votings/:id'},{
        forward: viewVotingById

    })
    app.get({from:'/votings/:id', to: '/votings/:id'},{
        forward: function ( model, params, next ) {
            console.log('@@'+params.id);
            service.votings.view(model, params.id);
            model.set('_page.mode', 'view');
        }

    })*/
    app.get('/:ns/new', function(page, model, params, next){
        console.log('instance page new');
        if(service[params.ns]){
            service[params.ns].main(page, model, params, next);
            model.set('_page.mode', 'new');

        } else next();
    });
    app.get('/:ns/:id', function(page, model, params, next){
        console.log('instance page with id');
        if(service[params.ns]){
            service[params.ns].main(page, model, params, next, function(){
                service[params.ns].view(model, params.id);
            })
            model.set('_page.mode', 'view');
        } else next();
    });
    app.get('/:ns', function(page, model, params, next){
        console.log('instance page');
        if(service[params.ns]){
            service[params.ns].main(page, model, params, next)
        } else next();
    });




}

