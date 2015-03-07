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



////竞技场操作/////
////////////得到相同等级的对手///////
Handler.prototype.requestSameLevelOpponent= function(msg,session,next){



}
//////////////////////
////////////////////进入相应竞技场////////////
Handler.prototype.requestEnterArena= function(msg,session,next){



}
