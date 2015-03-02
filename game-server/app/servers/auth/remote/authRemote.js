var userDb = require('../../../database/userDb');

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};



Remote.prototype.registerByDid = function(did, cb) {
	console.log(did);
	userDb.registerByDid(did,cb);
};

Remote.prototype.registerByUsername = function( username, password, did, email, cb) {
	userDb.registerByUsername(username, password, did, email, cb);
}