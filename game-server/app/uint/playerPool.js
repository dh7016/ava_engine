
//初始化
var playerPool=function(){

	//功能函数



	//1容纳player的数组
	this.playerArr={};
	//2计数器
	this.playerTotal=0;
	//3计时器
	var timer_id=0;



}



module.exports = playerPool;


///// 运行这个池的计时器/////
playerPool.prototype.runPool = function()
{
	//添加一个计时器
	this.timer_id = setInterval(function(){
		//1监控池中的所有player
		var tra;
		var length=this.playerTotal;
		var player;
		for(tra=0;tra<length;tra++) {
			//检查当前player镜像是否正在disconnected状态中
			player=this.playerArr[tra];
			if(player.life<=15) {
				//说明当前镜像已经和player失联 进入倒计时
				player.life--;
				if(player.life===0)
				{
					//说明这个镜像可以作废
					//进入销毁流程
					removePlayerByUid(player.uid);
				}
			}
		}
	}, 1000);
}
//停止运行这个池
playerPool.prototype.stopPool = function()
{
	clearInterval(this.timer_id);
}



///////////////////
///添加player
playerPool.prototype.addPlayer = function(player) {

	var name="ID"+player.uid;
	//1放入数组
	this.playerArr[name]=player;
	//2计数器增加
	this.playerTotal++;
	//3返回
	return true;
}
//删除player
//根据uid删除
playerPool.prototype.removePlayerByUid = function(uid){
	var name="ID"+uid;
	//删除
	var signal = delete this.playerArr[name];
	//计数器减小
	if(signal)playerTotal--;

	return signal;
}
//得到相应player
//根据uid
playerPool.prototype.getPlayerByUid = function(uid){
	var name="ID"+uid;

	var player = this.playerArr[name];
  	if (!player) {
    return null;
  	}
  	return player;
}





