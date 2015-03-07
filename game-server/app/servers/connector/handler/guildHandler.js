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



//工会的操作///
////////得到当前玩家的工会信息/////////////
Handler.prototype.requestTeamInfo= function(msg,session,next){



}
////////给相应的工会加入成员/////////////
Handler.prototype.requestAddTeamMember= function(msg,session,next){



}
////////给相应的工会削减成员/////////////
Handler.prototype.requestRemoveTeamMember= function(msg,session,next){



}
////////发出工会聊天/////////////
Handler.prototype.requestGuildTalk= function(msg,session,next){



}
////////修改工会图标/////////////
Handler.prototype.requestGuildFlagChange= function(msg,session,next){



}