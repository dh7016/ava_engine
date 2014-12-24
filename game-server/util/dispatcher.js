var crc = require('crc');
var math = require('mathjs');


//暂时随机算法
module.exports.dispatch = function(connectors) {
	var index = int(math.random()*connectors.length);
	return connectors[0];
};