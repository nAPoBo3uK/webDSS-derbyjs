/**
 * Created by bolehivsky on 05.07.14.
 */
module.exports = {
    main: function ( page, model, params, next, cb) {
        var userId =model.get('_session.userId');
        var i=-3;
        var userVotings = model.query('votings',{'owner':userId }).subscribe(function(){
            userVotings.ref('_page.list');
            i++;
            if(i==0) {
                if(cb) cb(page, model, params, next);
                page.render('votings');
            }
        });
        var query = {};
        query['participants.'+userId+'.role']={$eq: true}
        var expertPart = model.query('votings', query).subscribe(function(){
            expertPart.ref('_page.expertList');
            i++;
            if(i==0) {
                if(cb) cb(page, model, params, next);
                page.render('votings');
            }
        });
        query['participants.'+userId+'.role']={$eq: false}
        var observerPart = model.query('votings', query).subscribe(function(){
            observerPart.ref('_page.observerList');
            i++;
            if(i==0) {
                if(cb) cb(page, model, params, next);
                page.render('votings');
            }
        });
    },
    view: function (model, id) {
        console.log('votings view');
        var voting;
        if(voting = model.get('votings.' + id)) {
            model.ref('_page.view', 'votings.' + id);
            var user = model.at('auths.'+voting.owner).fetch(function(){
                model.ref('_page.votingOwner', user.at('local'));
            })

            model.start('_page.progress', 'votings.' + id + '.participants', 'progress');
        }

    }


}