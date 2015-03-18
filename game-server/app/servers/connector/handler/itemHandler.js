var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
var pomelo = require('pomelo');
var itemInfo=require('../../config/gameConfig/item.json');
var randomSys = require('../../../randomSys/randomSys');



//var logger = require('pomelo-logger').getLogger(__filename);

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};


//请求商店信息//////////////////////////////////////////////////////
////////////////////背包区域///////////////////
//请求刷新背包
Handler.prototype.requestFreshInventory=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2得到inventoryItems的信息 并且返回给客户端
	next(null,player.inventoryItems);
}
//请求出售物品
Handler.prototype.requestSellItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2根据msg的内容变卖相应的物品
	//目标物品的索引位置
	var itemIndex=msg.itemIndex;
	//变卖的数量
	var quantity=msg.quantity;
	//变卖目标物品 并且修改金钱 同时返还出来


	var gold_now=player.sellItemByIndex(itemIndex,quantity);
	//向客户端发送数据
	next(bull,{inventoryItems:player.inventoryItems,gold_now:gold_now});
}
//请求物品详细信息
Handler.prototype.requestItemInfo=function(msg,session,next){
	//1得到物品的id 和 等级
	var itemId=msg.itemId;
	var level=level;
	//2 返回物品信息
	next(null,itemInfo[itemId].detail[level-1]);
}
//请求物品的升级
Handler.prototype.requestItemUpgrade=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);

	//2找到目标目标item
	var itemIndex=msg.itemIndex;
	var levelUpdated=msg.levelUpdated;
	//3尝试升级 //如果result==1则通过
	var result=player.updateItemByIndex(itemIndex,levelUpdated);
	//4返回参数
	next(null,{signal:result})

}

////////////////商店区域//////////////////////
/////////////////////////////////////////////
Handler.prototype.requestFreshShopInfo=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);

	//2返回目标信息
	next(null,player.shopItems);
}
//请求重刷商店物品
Handler.prototype.requestFreshShopItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);


	//2尝试使用randomSys刷新player内的ShopItems
	player.shopItems.splice(0,player.shopItems.length);
	player.shopItems=randomSys.freshShopItem;
	//3返回新的结果
	next(null,player.shopItems);
}
//请求购买商店物品
Handler.prototype.requestBuyShopItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2得到用户传入信息
	var itemIndex=msg.itemIndex;
	//3尝试购买
	player.buyShopItemByIndex(itemIndex);	
}