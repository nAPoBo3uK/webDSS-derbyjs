/**
 * Created by bolehivsky on 28.06.14.
 */
var service = require('../services/votingsService');

module.exports = function(app){
    app.get('/votings', service.main);
    app.get('/votings/:id', function(page, model, params, next) {
        service.main(page, model, params, next, service.options);
    });
    app.get('/votings*', service.main);
}

