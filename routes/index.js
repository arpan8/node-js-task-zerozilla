const auth = require('./auth');


module.exports = {
    name: 'base-route',
    versioin: '1.0.0',
    register: (server)=>{
        server.route(auth);
    }
}