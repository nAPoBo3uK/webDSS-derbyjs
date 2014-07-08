/**
 * Created by bolehivsky on 05.07.14.
 */
module.exports = {
    main: function ( page, model, params, next, cb) {
        var userId =model.get('_session.userId');
        var i=-2;
        var userVotings = model.query('votings',{'owner':userId }).subscribe(function(){
            userVotings.ref('_page.list');
            i++;
            if(i==0) {
                if(cb) cb(page, model, params, next);
                page.render('votings');
            }
        });
        var query = {};
        query['participants.'+userId]={$exists: true}
        var partVotings = model.query('votings', query).subscribe(function(){
            partVotings.ref('_page.expertList');
            i++;
            if(i==0) {
                if(cb) cb(page, model, params, next);
                page.render('votings');
            }

        });

    },
    view: function (model, id) {
        console.log('votings view')
        if(model.get('votings.' + id)) {
            model.ref('_page.view', 'votings.' + id);
            model.start('_page.progress', 'votings.' + id + '.participants', 'progress');
        }

    }


}