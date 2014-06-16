/**
 * Created by bolehivsky on 10.06.14.
 */
var model;
module.exports =  {
    middleware: function(app){
        model = app.model;
    },
    get: function(name){
        switch(name){
            case 'userVotings':
                return model.at('auths.' + model.get('_session.userId') +'.votings');
            break;
        }
    }
}