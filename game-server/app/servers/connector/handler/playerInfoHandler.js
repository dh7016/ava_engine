var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
//var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');



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
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	console.log(session.uid);
	console.log(player);

	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		next(null,{signal:1,gold:player.gold});
	}
}
////改变diamond数值 同时返回现在的diamond值
Handler.prototype.requestFreshDiamondVal=function(msg,session,next){
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);


	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		next(null,{signal:1,shard:player.diamond});
	}
}

////////////////player basic info///////////////////////////
//////请求player的基本信息
Handler.prototype.requestPlayerBasicInfo=function(msg,session,next){



}
//更新玩家的头像
Handler.prototype.requestChangePlayerIcon=function(msg,session,next){
//基础信息包括玩家的等级 当前经验值 头像的index  名字


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
