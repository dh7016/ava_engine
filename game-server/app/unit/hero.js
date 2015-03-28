//这是一个玩家在服务器端的镜像
//构造函数
var Hero = function() {
	//heroId
	this.heroId=0;
	//最高等级
    this.maxLevel=60;
    //当前等级
    this.level=1;
    //物品格数量
    this.ItemGrid=3;
    //物品格内放置物品在背包中的id 背包内物品的id
    this.itemEquiped=[];
}

module.exports = Hero;