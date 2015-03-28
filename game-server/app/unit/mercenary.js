//这是一个玩家在服务器端的镜像
//构造函数
var Mercenary = function() {
	 //rank
	 this.rank=0;
     //looking id样貌
	 this.lookingId=0;
	 //职业
	 this.profession=0;
	 //当前等级
	 this.level=1;
	 //最高等级
	 this.maxLevel=60;
	 //每等级的成长值 hp attack
	 this.hpGPL=10;
	 this.apGPL=10;
	 //攻击力
	 this.ap=0;
	 this.hp=0;
	 this.attackType=0;
	 this.range=100;
	 this.rebormTime=10;
	 //物品格数量
	 this.itemGrid=3;
	 //物品格内放置物品在背包中的id
	 this.itemEquiped=[];
};

module.exports = Mercenary;