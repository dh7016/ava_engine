var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
var pomelo = require('pomelo');

//var logger = require('pomelo-logger').getLogger(__filename);

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



//////佣兵页面////
/////得到佣兵页面信息
Handler.prototype.requestFreshMercenaryInfo=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2返回信息
	next(null,player.mercenaryOwned);
}
/////升级相应佣兵//////
Handler.prototype.requestUpgradeMercenary=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析客户端发来的信息
	var mercenaryIndex=msg.mercenaryIndex;
	var levelUpdated=msg.levelUpdated;
	//3处理并得到结果
	var result=player.upgradeMercenaryByIndex(mercenaryIndex,levelUpdated);
	//4返回结果
	next(null,result);
}
/////给佣兵添加物品//////
Handler.prototype.requestAddMercenaryItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析客户端发来的信息
	var mercenaryIndex=msg.mercenaryIndex;
	var itemIndex=msg.itemIndex;
	//3处理并得到结果
	var result=player.AddMercenaryItemyByIndex(mercenaryIndex,itemIndex);
	//4返回结果
	next(null,result);
}
/////给佣兵移除物品//////
Handler.prototype.requestRemoveMercenaryItem=function(msg,session,next){

	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析客户端发来的信息
	var mercenaryIndex=msg.mercenaryIndex;
	var gridIndex=msg.gridIndex;
	//3处理并得到结果
	var result=player.removeMercenaryItemyByIndex(mercenaryIndex,gridIndex);
	//4返回结果
	next(null,result);
}