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



//team的操作///
////////得到当前玩家的team信息/////////////
Handler.prototype.requestTeamInfo= function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2返回信息
	next(null,player.team);
}
////////给相应的team加入成员/////////////
Handler.prototype.requestAddTeamMember= function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析玩家传入的信息
	var type=msg.type;
	var memberIndex=msg.memberIndex;
	var teamIndex=msg.teamIndex;
	//3尝试加入数组
	var result=player.addTeamMemberByIndex(type,teamIndex,memberIndex);
	//4返回处理结果 包括signal 和刷新后的teamInfo
	next(null,result);
}
////////给相应的team削减成员/////////////
Handler.prototype.requestRemoveTeamMember= function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2解析玩家传入的信息
	var memberIndex=msg.memberIndex;
	var teamIndex=msg.teamIndex;
	//3尝试去除组成员
	var result=player.removeTeamMemberByIndex(teamIndex,memberIndex);
	//4返回处理结果 包括signal 和刷新后的teamInfo
	next(null,result);


}
