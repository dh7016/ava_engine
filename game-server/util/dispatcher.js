var crc = require('crc');



//暂时随机算法
module.exports.dispatch = function(connectors) {
	//var index = int(Math.random()*connectors.length);
	return connectors[0];
};