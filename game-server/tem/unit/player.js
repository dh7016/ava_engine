var EventEmitter = require('events').EventEmitter;
var util = require('util');


///这里储存一个玩家的具体信息
module.exports = player;

util.inherits(player, EventEmitter);

var player = function(data) {
	//初始化这个player 容器
	this.uid=data.uid;
	








}