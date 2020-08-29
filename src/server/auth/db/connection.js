const monk = require('monk');
const db = monk('localhost/retopt-auth');

module.exports = db;
