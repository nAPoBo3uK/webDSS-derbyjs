/**
 * Created by bolehivsky on 30.06.14.
 */
var service = require('../services/accountService');

module.exports = function(app){
    app.get('/account', service.account );
    app.get('/login', service.registration );
    app.get('/registration', service.login );
}