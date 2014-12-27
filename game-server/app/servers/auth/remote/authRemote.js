var userDb = require('../../../database/userDb');

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};



Remote.prototype.registerByDid = function(did, cb) {
	userDb.loginByDid(did,cb);
};

Remote.prototype.registerByUsername = function(username, password, did, email, cb) {
	userDb.loginByUsername(username, password, did, email, cb);
}