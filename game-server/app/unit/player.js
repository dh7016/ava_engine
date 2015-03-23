


var hero = require('../unit/hero.js');
var item = require('../unit/item.js');

//这是一个玩家在服务器端的镜像
//构造函数
var Player = function() {

	//working
	//初步设定镜像的消隐周期为15秒；
	this.life=16;

	//uid
  	this.uid="";
  	//did
  	this.did="";
  	//gold
  	this.gold=0;
  	//diamond
  	this.diamond=0;
  	//等级
  	this.level=0
  	//爵位
  	this.rank=0;
  	//经验
  	this.exp=0;
    //升级到下一级所需要的经验
    this.levelExpCap=0;

  	//头像index
  	this.avatarId=0;
  	//名字
  	this.playerName="";
  	//..................
    ///背包信息
    //背包容量
    this.inventoryMax=10;
    //背包内物品
    this.itemOwned=[];
    //佣兵
    //佣兵数量
    this.mercenaryMax=3;
    //拥有佣兵具体信息
    this.mercenaryOwned=[];
    //英雄
    this.heroOwned=[];//这里存放着英雄的基本信息 以herojs为单位
    //背包容量
    this.inventoryCapacity=0;//背包的容量
    //背包物品
    this.inventoryItems=[];//这里储存了背包内的物品 以itemjs为单位
    //商店内物品 
    this.shopItems=[];//这个类似inventoryitems
    //玩家的组队
    this.team=[];//team里的格式是[{type:0/1,index:    }][]0是英雄 1是佣兵 index是相应成员在相应组内的编号
    //该玩家的地图信息
    this.mapInfo=[];//这里的信息明确了玩家当前过了几关解锁了那些关 以及一些关卡的进度等等
    ///信息格式暂不确定
};

module.exports = Player;



///当玩家断连时 启动这个方法 开始计时
Player.prototype.disconnected = function() {
	this.life=15;
};
///当玩家断连又回来后启动这个方法
Player.prototype.restore = function() {
	//设置生命为安全数
	this.life=16;
}
///附属操作方法
//添加一个英雄数据
Player.prototype.addHero=function(heroId,level,itemPlaced)
{
  var new_hero = new hero();
  //heroid
  new_hero.heroId=heroId;
  //level
  new_hero.level=level;
  //itemplacedId in inevntory
  //复制数组
  var tra,length=itemPlaced.length;
  for(tra=0;tra<length;tra++){
    new_hero[tra]=itemPlaced[tra];
  }
  //new_hero加入数组
  this.heroOwned.push(new_hero);

}
//添加一个一个mecenary数据
Player.prototype.addMercenary=function(mercenary)
{
  //加入新佣兵信息
  mercenaryOwned.push(mercenary);
}
//添加一个背包物品数据
Player.prototype.addItem=function(itemId,level,quantity)
{
  var new_item = new item();
  //itemid
  new_item.itemId=itemId;
  //level
  new_item.level=level;
  //quantity
  new_item.quantity=quantity;
  //new_item加入数组
  this.inventoryItems.push(new_item);

}
/////对物品的操作
////贩卖相应index位置的物品
Player.prototype.sellItemByIndex=function(itemIndexArr) {
  //1删除相应索引的物品
  var tra,length=itemIndexArr.length,price_sold;
  var itemBase=itemInfo=require('../../config/gameConfig/item.json')
  for(tra=0;tra<length;tra++){
    var item=this.inventoryItems[itemIndexArr[tra]];

    //1找到相应物品的出售价钱
    price_sold+=itemBase[item.itemid].detail[item.level-1].price;

    //2删除相应的物品
    delete this.inventoryItems[itemIndexArr[tra]];
  }

  //返还玩家出售后的金币总量
  return this.gold+price_sold;
}
////贩卖相应id位置的物品
Player.prototype.sellItemByItemId=function(itemId,quantity) {


}
////升级相应index的物品的相应等级
Player.prototype.updateItemByIndex=function(index,levelUpdated) {


}
//购买商店物品
Player.prototype.buyShopItemByIndex=function(itemIndex) {


}
//英雄升级
Player.prototype.upgradeHeroByIndex=function(heroIndex,levelUpdated) {


}
//给index英雄添加背包内索引index的物品
Player.prototype.AddHeroItemByIndex=function(heroIndex,itemIndex) {


}
//移除相应index英雄相应index格的物品
Player.prototype.removeHeroItemByIndex=function(heroIndex,gridIndex) {



}
//升级相应的佣兵
Player.prototype.upgradeMercenaryByIndex=function(mercenaryIndex,levelUpdated) {



}
//给相应佣兵添加物品
Player.prototype.AddMercenaryItemyByIndex=function(mercenaryIndex,itemIndex) {



}
//给相应佣兵添加物品
Player.prototype.removeMercenaryItemyByIndex=function(mercenaryIndex,gridIndex) {



}


/////team
///添加组成员
Player.prototype.addTeamMemberByIndex=function(type,teamIndex,memberIndex) {



}
//去除组成员
Player.prototype.removeTeamMemberByIndex=function(teamIndex,memberIndex) {



}


// 地图相应
Player.prototype.activateStageByIndex=function(stageIndex) {



}