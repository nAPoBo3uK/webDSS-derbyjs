/**
 * Created by bolehivsky on 30.06.14.
 */

var accessManager = require('../services/accessManager');
module.exports = function(app){
    app.get('*', accessManager.validateSession);

}

