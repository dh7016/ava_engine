var mercenaryService = module.exports;

///这里是对佣兵的处理


//创建一个随机的佣兵角色
mercenaryService.getRandomMercenary = function() {
	var rate;
	//1得到佣兵的橙色
	rate = getRandomNumber(100);
	if(rate>=0&&rate<=10) {
		//一等

	}
	else if(rate>=11&&rate<=30) {
		//二等
	}
	else if(rate>=31&&rate<=61) {
		//三等
	}
	else {
		//四等
	}


}














var getRandomNumber = function(end) {
	return Math.floor(Math.random()*(end+1));
}