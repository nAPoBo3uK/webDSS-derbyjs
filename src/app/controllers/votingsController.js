/**
 * Created by bolehivsky on 28.06.14.
 */
var service = require('../services/votingsService');

module.exports = function(app){
    app.get('/votings/:id', service.main);
    app.get('/votings*', service.main);
}

