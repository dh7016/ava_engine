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



//地图///////
/////////得到当前玩家地图数据////////////////
Handler.prototype.requestMapInfo= function(msg,session,next){



}
//////////得到一个关卡的详细数据介绍/////
Handler.prototype.requestStageInfo= function(msg,session,next){



}
////////激活一个新的关卡/////
Handler.prototype.requestActivateStage= function(msg,session,next){



}
////////尝试进入一个关卡/////
Handler.prototype.requestEnterStage= function(msg,session,next){



}