var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
//var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var playerExpCap = require('../../../../config/gameConfig/playerLevelExpCap.json');


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
		next(null,{signal:1,diamond:player.diamond});
	}
}

////////////////player basic info///////////////////////////
//////请求player的基本信息
Handler.prototype.requestPlayerBasicInfo=function(msg,session,next){

	//基础信息包括玩家的等级 当前经验值 头像的index  名字
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);


	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		next(null,{signal:1,level:player.level,rank:player.rank,exp:player.exp,avatarId:player.avatarId,playerName:player.playerName});
	}

}
//更新玩家的头像
Handler.prototype.requestChangePlayerIcon=function(msg,session,next){
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		//设置新的头像id
		player.avatarId=msg.avatarId;
		next(null,{signal:1,avatarId:player.avatarId});
	}
}
//更新玩家的头衔
Handler.prototype.requestChangePlayerTitle=function(msg,session,next){
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		//设置新的rank
		player.rank=msg.rank;
		next(null,{signal:1,rank:player.rank});
	}
}
//更新玩家的经验
Handler.prototype.requestChangePlayerExp=function(msg,session,next){
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		//设置新的exp
		player.exp=msg.exp;
		//根据新的exp检测是否已经升级
		if(player.exp>=player.levelExpCap) {
			//说明达到升级要求
			//1根据升级表来更新下一级的经验
			player.playerExpCap=playerLevelExpCap[player.level];
			//2更新级别
			player.level++;
		}

		next(null,{signal:1,exp:player.exp,level:player.level,levelExpCap:player.levelExpCap});
	}
}
//更新玩家的昵称
Handler.prototype.requestChangePlayerName=function(msg,session,next){
	//得到镜像
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	if(player===null){//查询错误
		next(null,{signal:0});
	}
	else{//查询正常
		//设置新的rank
		player.playerName=msg.playerName;
		next(null,{signal:1,playerName:player.playerName});
	}
}
