var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
//var logger = require('pomelo-logger').getLogger(__filename);

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



//team的操作///
////////得到当前玩家的team信息/////////////
Handler.prototype.requestTeamInfo= function(msg,session,next){



}
////////给相应的team加入成员/////////////
Handler.prototype.requestAddTeamMember= function(msg,session,next){



}
////////给相应的team削减成员/////////////
Handler.prototype.requestRemoveTeamMember= function(msg,session,next){



}
