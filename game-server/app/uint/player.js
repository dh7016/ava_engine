


//这是一个玩家在服务器端的镜像
//构造函数
var Player = function(data) {
	//uid
  	this.uid=data.uid;
  	//did
  	this.did=data.did;
  	//gold
  	this.gold=data.gold;
  	//diamond
  	this.diamond=data.diamond;

  	//..................

};

module.exports = Player;


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

