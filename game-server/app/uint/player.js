


//这是一个玩家在服务器端的镜像
//构造函数
var Player = function() {

	//working
	//初步设定镜像的消隐周期为15秒；
	this.life=16;

	//uid
  	this.uid=data.uid;
  	//did
  	this.did=data.did;
  	//gold
  	this.gold=data.gold;
  	//diamond
  	this.shard=data.shard;

  	//..................

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

