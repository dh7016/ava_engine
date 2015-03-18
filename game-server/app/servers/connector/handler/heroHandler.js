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
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2返回信息
	next(null,player.heroOwned);
}
/////升级相应英雄//////
Handler.prototype.requestUpgradeHero=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2尝试得到玩家数据
	var heroIndex=msg.heroIndex;
	var levelUpdated=msg.levelUpdated;
	//3尝试升级英雄 //这个result内部包含 signal 和升级之后的英雄的信息
	var result=player.upgradeHeroByIndex(heroIndex,levelUpdated);
	//4返回结果
	next(null,result);
}
/////给英雄添加物品//////
Handler.prototype.requestAddHeroItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2尝试得到玩家数据
	var heroIndex=msg.heroIndex;
	var itemIndex=msg.itemIndex;
	//3尝试添加物品
	var result=player.AddHeroItemByIndex(heroIndex,itemIndex);
	//4返回结果
	next(null,result);

}
/////给英雄移除物品//////
Handler.prototype.requestRemoveHeroItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2尝试得到玩家数据
	var heroIndex=msg.heroIndex;
	var gridIndex=msg.gridIndex;//这个是指物品栏的索引位置
	//3尝试添加物品
	var result=player.removeHeroItemByIndex(heroIndex,gridIndex);
	//4返回结果
	next(null,result);


}