//这是一个玩家在服务器端的镜像
//构造函数
var Mercenary = function() {
    //looking id样貌
	 this.lookingId=0;
	 //职业
	 this.profession=0;
	 //最高等级
	 this.maxLevel=60;
	 //每等级的成长值 hp attack
	 this.hpGPL=10;
	 this.apGPL=10;
	 //物品格数量
	 this.ItemGrid=3;
	 //物品格内放置物品在背包中的id
	 this.itemPlacedId=[];
	 //佣兵的属性 包括ap hp..............
	 this.attribute={};
};

module.exports = Mercenary;