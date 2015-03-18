
var pomelo = require('pomelo');
var userDb = require('userDb');

////同步数据/////
var dataSnyc = function() {
    this.counter=0;
    this.cutPoint=0;
    this.timerId=0;
    this.playerpool=pomelo.app.get('playerpool');
    this.index=0;
    this.length=0;
};

module.exports = dataSnyc;




dataSnyc.prototype.runDataSync = function() {
	this.length=playerpool.playerArr.length;
	var tra;
	//开始运行同步	
	this.timerId = setInterval(function(){
		//这里需要尝试同步所有player的信息 但是需要一个一个的同步 一起同步可能会造成崩溃
		for(tra=0;tra<this.length;tra++) {
			userDb.savePlayerInfo(playerpool.playerArr[this.index],function(res){
				if(res.signal==1) {
					//说明这个玩家同步成功
					// 索引向下
					//this.index++;
					//继续同步
				}
			})
		}



	}, 1000000);

};

dataSnyc.prototype.stopDataSync = function() {
	//开始运行同步	
	clearInterval(this.timerId);
};
