var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
var stageInfo=require('../../../../config/base/stageBase.json');


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
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2返回结果
	next(null,player.mapInfo);



}
//////////得到一个关卡的详细数据介绍/////
Handler.prototype.requestStageInfo= function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析客户端发来的信息
	var stageIndex=msg.stageIndex;
	//3返回结果
	next(null,mapInfo[stageIndex]);


}
////////激活一个新的关卡/////
Handler.prototype.requestActivateStage= function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析客户端发来的信息
	var stageIndex=msg.stageIndex;
	//3处理并得到结果
	var result=player.activateStageByIndex(mapIndex);
	//4返回结果
	next(null,result);
}
////////尝试进入一个关卡/////
Handler.prototype.requestEnterStage= function(msg,session,next){
	//1解析客户端发来的信息
	var stageIndex=msg.stageIndex;
	//2尝试获取相应关卡的ai信息
	var stageAi=require('../../config/gameConfig/stageAi/stageAi'+stageIndex.toString()+'.json');
	//3尝试返回给玩家相应stage信息
	if(stageAi!=undefined) {
		next(null,{signal:1,stageAi:stageAi});
	}
	else {
		next(null,{signal:0});
	}
}