var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
var pomelo = require('pomelo');
var itemInfo=require('../../../../config/gameConfig/item.json');
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
//请求扩充背包容量
Handler.prototype.requestIncreaseInventoryCapacity=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2的到用户传入的数据
	var capacityIncreased=msg.capacityIncreased;
	player.inventoryCapacity+=capacityIncreased;

	//2得到inventoryItems的信息 并且返回给客户端
	next(null,{inventoryCapacity:player.inventoryCapacity});
}




//请求刷新背包
Handler.prototype.requestFreshInventory=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);


	//2得到inventoryItems的信息 并且返回给客户端
	next(null,{inventoryCapacity:player.inventoryCapacity,inventoryItems:player.inventoryItems});
}
//请求出售物品
Handler.prototype.requestSellItem=function(msg,session,next){
	//1调取相应player
	var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
	//2根据msg的内容变卖相应的物品
	//目标物品的索引集合
	var itemIndexArr=msg.item_index_arr;
	//变卖目标物品 并且修改金钱 同时返还出来


	var currency_owned=player.sellItemByIndex(itemIndexArr);
	//向客户端发送数据
	next(null,{inventoryItems:player.inventoryItems,gold:currency_owned.gold,diamond:currency_owned.diamond});
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
	//2得到用户的参数
	var page=msg.page;
	//3返回目标信息
	if(page===1){
		//请求随机物品页面
		next(null,player.shopItems);
	}
	else if(page===2){
		//请求固定物品页面
		var shopItemsR=require('../../../../config/gameConfig/shopItemsR.json');
		next(null,shopItemsR);
	}
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
	var page=msg.page;
	//3尝试购买
	player.buyShopItemByIndex(itemIndex,page);	
	//4返回结果
	next(null,{shopItems:player.shopItems,gold:player.gold,diamond:player.diamond});
}