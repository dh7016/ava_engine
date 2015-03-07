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




//////英雄页面////
/////得到英雄页面信息
Handler.prototype.requestFreshHeroInfo=function(msg,session,next){



}
/////升级相应英雄//////
Handler.prototype.requestUpgradeHero=function(msg,session,next){



}
/////给英雄添加物品//////
Handler.prototype.requestAddHeroItem=function(msg,session,next){



}
/////给英雄移除物品//////
Handler.prototype.requestRemoveHeroItem=function(msg,session,next){



}

//////佣兵页面////
/////得到佣兵页面信息
Handler.prototype.requestFreshMercenaryInfo=function(msg,session,next){



}
/////升级相应佣兵//////
Handler.prototype.requestUpgradeMercenary=function(msg,session,next){



}
/////给佣兵添加物品//////
Handler.prototype.requestAddMercenaryItem=function(msg,session,next){



}
/////给佣兵移除物品//////
Handler.prototype.requestRemoveMercenaryItem=function(msg,session,next){



}
