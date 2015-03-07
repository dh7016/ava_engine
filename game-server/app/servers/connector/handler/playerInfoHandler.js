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



//区域性的方法
//////金币 钻石
//改变gold数值 同时返回现在的gold值
Handler.prototype.requestFreshGoldVal= function(msg,session,next){



}
////改变diamond数值 同时返回现在的diamond值
Handler.prototype.requestFreshShardVal=function(msg,session,next){



}

////////////////player basic info///////////////////////////
//////请求player的基本信息
Handler.prototype.requestPlayerBasicInfo=function(msg,session,next){



}
//更新玩家的头像
Handler.prototype.requestChangePlayerIcon=function(msg,session,next){



}
//更新玩家的头衔
Handler.prototype.requestChangePlayerTitle=function(msg,session,next){



}
//更新玩家的经验
Handler.prototype.requestChangePlayerExp=function(msg,session,next){



}
//更新玩家的昵称
Handler.prototype.requestChangePlayerName=function(msg,session,next){



}
