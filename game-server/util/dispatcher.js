var crc = require('crc');



//暂时随机算法
module.exports.dispatch = function(servers) {
	//var index = int(Math.random()*connectors.length);
	return servers[0];
};


