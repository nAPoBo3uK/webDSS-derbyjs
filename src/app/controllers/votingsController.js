/**
 * Created by bolehivsky on 28.06.14.
 */

module.exports = function ( page, model, params, next) {
    /*  model.on('all', '**', function (path, event) {
     console.log('model.event');
     console.log(arguments);
     });*/
    var userVotings = model.query('votings',{'owner':model.get('_session.userId')}).subscribe(function(){

        userVotings.ref('_page.list');

        if(params.query.action){
            switch(params.query.action){
                case 'new':
                    if(!model.get('_state.votings.new')){
                        model.set('_state.votings.new',{});
                    }
                    break;
                case 'view':
                    if(!model.get('_state.votings.selected')){
                        if(params.query.id)
                            model.ref('_state.votings.selected','_page.list.' + params.query.id);
                    }
                    break;
            }

        }
        page.render('votings');
    });

}