
var mercenary = require('../unit/mercenary.js');
var randomConfig = require('../../config/randomConfig.json');



var randomSys=function(){
	//得到物品的总点数为随机抽取物品做准备
	this.itemRandomChanceData=randomConfig[1];

	var tra,length=this.itemRandomChanceData.length;

	for(tra=0;tra<length;tra++) {
		this.itemChancePointTotal+=itemRandomChanceData[tra].chancePoint;
	}
}

 module.exports=randomSys;

////随机产生佣兵///
randomSys.prototype.getRandomMercenary=function() {
	var new_mercenary=new mercenary();
	//随机生成属性
	////佣兵暂定分为3个等级
	//1决定等级 生成一个随机数
	var rankChance=randomRoll(0,100);
	if(rankChance>=0&&rankChance<=randomConfig.chanceRank1) {//等级1
		new_mercenary.rank=1;
	}
	else if (rankChance>randomConfig.chanceRank1&&rankChance<=randomConfig.chanceRank2) {//等级2
		new_mercenary.rank=2;
	}
	else if (rankChance>randomConfig.chanceRank2&&rankChance<=randomConfig.chanceRank3) {//等级3
		new_mercenary.rank=3;
	}
	//2决定这个佣兵的职业 总共有9个职业
	var professionChance=randomRoll(0,100);
	

	
	return new_mercenary;
}

//////随机产生商品//////////
randomSys.prototype.freshShopItem=function(itemTotal){
	//根据商店的需求随机帅选出相应数量的物品 返还结果为响应的itemId
	var tra;
	var resultItems=[];
	for(tra=0;tra<itemTotal;tra++) {
		resultItems.push(getRandomItem);
	}
	return resultItems;
}

randomSys.prototype.getRandomItem=function() {
	//1得到一个0到总点数的随机数
	var randomNum=randomRoll(0,this.itemChancePointTotal);
	//2根据这个点数来确定得到了哪个物品
	var tra,length=this.itemRandomChanceData.length;
	var itemId=-1;
	var chancePointNow=0;
	for(tra=0;tra<length;tra++) {
		//更新当前物品的几率节点
		chancePointNow+=this.itemRandomChanceData[tra].chancePoint;
		//检测是否选中该物品
		if(chancePointNow>=randomNum) {
			//说明该物品被选中
			itemId=this.itemRandomChanceData[tra].itemId;
			break;
		}
		else {
			//说明该物品没有选中 则继续筛选


		}

	}

	///返还选中结果itemId就是被选中物品的id
	return {itemId:itemId,level:1};
}
 ///////////////random function//////////
 ////////得到一个随机数/////////
 randomSys.prototype.randomRoll=function(minPoint,maxPoint) {
 	return Math.round(Math.random()*(maxPoint-minPoint))+minPoint; 
 }