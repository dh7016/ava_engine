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


//请求商店信息//////////////////////////////////////////////////////
////////////////////背包区域///////////////////
//请求刷新背包
Handler.prototype.requestFreshInventory=function(msg,session,next){



}
//请求出售物品
Handler.prototype.requestSellItem=function(msg,session,next){



}
//请求物品详细信息
Handler.prototype.requestItemInfo=function(msg,session,next){



}
//请求物品的升级
Handler.prototype.requestItemUpgrade=function(msg,session,next){



}

////////////////商店区域//////////////////////
/////////////////////////////////////////////
Handler.prototype.requestFreshShopInfo=function(msg,session,next){



}
//请求重刷商店物品
Handler.prototype.requestFreshShopItem=function(msg,session,next){




}
//请求购买商店物品
Handler.prototype.requestBuyShopItem=function(msg,session,next){



}