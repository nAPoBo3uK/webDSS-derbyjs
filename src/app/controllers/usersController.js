/**
 * Created by bolehivsky on 28.06.14.
 */
var service = require('../services/usersService');
module.exports = function(app){
    app.get('/users*', service.main);
}

