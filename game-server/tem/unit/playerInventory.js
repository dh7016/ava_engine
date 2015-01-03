var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = playerInventory;

util.inherits(playerInventory, EventEmitter);

var playerInventory = function(data) {
	//初始化这个inventory 容器
	this.uid=data.uid;
	








}