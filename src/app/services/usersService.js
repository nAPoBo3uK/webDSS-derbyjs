/**
 * Created by bolehivsky on 05.07.14.
 */
module.exports = {
    main: usersPage,
    view: view,
    checkRelatedVoting: checkRelatedVoting
}

function usersPage( page, model, params, next, cb ){
    var usersQuery = model.query('auths', {}).subscribe(function(){
        usersQuery.ref('_page.list');
        // makes possible a participants list edit
        if(page.params.previous)
            checkRelatedVoting( page, model );
        page.render('users');
        if(cb) cb(page, model, params, next);

    })
}

function view(model, id){
    if(model.get('auths.'+ id))
        model.ref('_page.view', 'auths.'+ id + '.local');
}

function checkRelatedVoting(page, model){
    console.log('checkRelatedVoting');
    var pathBlocks = page.params.previous.split('/'); // parse last url
    if (pathBlocks[1] === 'votings' && pathBlocks[2] && pathBlocks[2].length === 36) { // if last page was 'votings' and any voting was selected
        var userVotings = model.query('votings', {'_id': pathBlocks[2]}).subscribe(function () {
            userVotings.ref('_related.voting');
        });
    }
}