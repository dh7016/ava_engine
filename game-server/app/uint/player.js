


//这是一个玩家在服务器端的镜像
//构造函数
var Player = function() {

	//working
	//初步设定镜像的消隐周期为15秒；
	this.life=16;

	//uid
  	this.uid="";
  	//did
  	this.did="";
  	//gold
  	this.gold=0;
  	//diamond
  	this.diamond=0;
  	//等级
  	this.level=0
  	//爵位
  	this.rank=0;
  	//经验
  	this.exp=0;
  	//头像index
  	this.avatarId=0;
  	//名字
  	this.playerName="";
  	//..................
    ///背包信息
    //背包容量
    this.inventoryMax=10;
    //背包内物品
    this.itemOwned=[];
    //佣兵
    //佣兵数量
    this.mercenaryMax=3;
    //拥有佣兵具体信息
    this.mercenaryHired=[];
    //英雄
    


};

module.exports = Player;



///当玩家断连时 启动这个方法 开始计时
Player.prototype.disconnected = function() {
	this.life=15;
};
///当玩家断连又回来后启动这个方法
Player.prototype.restore = function() {
	//设置生命为安全数
	this.life=16;
}


/*//hello.js 
function Hello() { 
	varname; 
	this.setName = function(thyName) { 
		name = thyName; 
	}; 
	this.sayHello = function() { 
		console.log('Hello ' + name); 
	}; 
}; 
module.exports = Hello;


var Hello = require("");
hello=new Hello();

*/

