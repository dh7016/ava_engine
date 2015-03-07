
//初始化
var playerPool=function(){

	//1容纳player的数组
	this.playerArr={};
	//2计数器
	this.playerTotal=0;



}



module.exports = playerPool;



///添加player
playerPool.prototype.addPlayer = function(player) {
	//1放入数组
	this.playerPool[player.uid]=player;
	//2计数器增加
	playerTotal++;
	//3返回
	return true;
}
//删除player
//根据uid删除
playerPool.prototype.removePlayerByUid = function(uid){

	//删除
	var signal = delete this.playerPool[uid];
	//计数器减小
	if(signal)playerTotal--;

	return signal;
}
//得到相应player
//根据uid
playerPool.prototype.getPlayerByUid = function(uid){
	return this.playerPool[uid];
}

