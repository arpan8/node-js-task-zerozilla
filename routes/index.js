const auth = require('./auth');
const agency_client = require('./agency_and_client');

module.exports = {
    name: 'base-route',
    versioin: '1.0.0',
    register: (server)=>{
        server.route(auth);
        server.route(agency_client);
    }
}