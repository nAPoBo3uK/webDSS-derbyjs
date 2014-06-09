/**
 * Created by bolehivsky on 09.06.14.
 */
// Настраиваем derby-auth
var auth = require('derby-auth');

var options = {
    passport: {
        failureRedirect: '/login'
        , successRedirect: '/'
        , usernameField: 'email'
    },
    site: {
     domain: 'http://localhost:3000',
     name: 'webDSS',
     email: 'admin@mysite.com'
     },
    smtp: {
        service: 'Gmail',
        user: 'zag2art@gmail.com',
        pass: 'blahblahblah'
    }
}


module.exports = function (store){
    auth.store(store);
    return auth.middleware({}, options);
}

