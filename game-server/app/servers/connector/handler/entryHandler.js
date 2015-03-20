///同步///
var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
var acc = require('../../../acc/supportFunction');
var item = require('../../../unit/item.js');
var hero = require('../../../unit/hero.js');

//var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');


module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.requestEnter = function(msg, session, next) {
  //当一个玩家链接到connector时的相关处理
  ////////////////////////////
  var uid=msg.uid;
  self = this;
  
  var playerPool=pomelo.app.get('playerpool');
  var player=playerPool.getPlayerByUid(uid);



  //1设置相应的session
   //剔除之前的session
  self.app.get('sessionService').kick(uid);

  session.bind(uid);

  session.set('uid', uid);
  session.on('closed', onUserLeave.bind(null, self.app));
  session.pushAll();



  //2检查改player的服务器镜像已经存在
  if(player===null) {//说明没有现成镜像
    //在从数据库得到用户信息后 在playerpool中建立相应的镜像
    userDb.getPlayerInfoByUid(uid,function(res){
      
      if(res!==null)
      {
        console.log(res);
        console.log(res[0].gold);
        console.log(res[0].diamond);
        //提取信息成功
        //创建一个新的镜像
        ////开始关联该镜像的数据信息
        var p=require('../../../unit/player.js');
        var new_player=new p();
        //开始向镜像中写入玩家信息
        //uid
        new_player.uid=res[0].uid;

        //gold 
        new_player.gold=res[0].gold;
        //diamond
        new_player.diamond=res[0].diamond;
        //basicInfo
        var basicInfoJson=acc.stringToJson(res[0].basicInfo);
        //相应属性写入镜像
        //等级
         new_player.level=basicInfoJson.level;
        //爵位
         new_player.rank=basicInfoJson.rank;
        //经验
        new_player.exp=basicInfoJson.rank;
        //头像index
        new_player.avatarId=basicInfoJson.avatarId;
         //名字
        new_player.playerName=basicInfoJson.playerName;
        //背包物品
        //解析背包数据


        var inventoryItems=acc.stringToJson(res[0].inventoryItems);
        player.inventoryItems=inventoryItems;
        /*var tra,length=inventoryItems.length;
          for(tra=0;tra<length;tra++){
          var itemData=inventoryItems[tra];
          var new_item=new item();
          //填入数据
          new_item.itemId=itemData.itemId;
          new_item.quantity=itemData.quantity;
          new_item.level=itemData.level;
          //填入物品数组
          new_player.inventoryItems.push(new_item);
         }*/
       
        //解析英雄数据
        var heroOwned=acc.stringToJson(res[0].heroOwned);
        length=heroOwned.length;
        for(tra=0;tra<length;tra++) {
          //生成heroOwned数据
          var heroData=heroOwned[tra];
          var new_hero=new hero();
          //填入数据
          //id
          new_hero.heroId=heroData.heroId;
          //level
          new_hero.level=heroData.level;
          //itemplaced
          new_hero.itemplaced=heroData.itemplaced;
          //填入英雄数组
          new_player.heroOwned.push(new_hero)
        }
        

        //解析佣兵数据
        var mercenaryOwned=acc.stringToJson(res[0].mercenaryOwned);
        length=mercenaryOwned.length;
        for(tra=0;tra<length;tra++) {
          //生成heroOwned数据
          var mercenaryData=mercenaryOwned[tra];
          var new_mercenary=new mercenary();
          //填入数据
          //rank
          new_mercenar.rank=mercenaryData.rank;
          //level
          new_mercenary.level=mercenaryData.level;
          ////looking id样貌
          new_mercenary.lookingId=mercenaryData.lookingId;
          //职业
          new_mercenary.profession=mercenaryData.profession;
          //每等级的成长值 hp attack
          new_mercenary.hpGPL=10;
          new_mercenary.apGPL=10;
          //物品格数量
          new_mercenary.ItemGrid=3;
           //物品格内放置物品在背包中的id
          new_mercenary.itemPlaced=mercenaryData.itemPlaced;
         //佣兵的属性 包括ap hp..............
          new_mercenary.attribute=mercenaryData.attribute;
          //放入数组
          new_player.heroOwned.push(new_mercenary)
        }
        
        //....
        //.....
        //.....
        //放入playerpool
        playerPool.addPlayer(new_player);


        next(null,{signal:1});
      }
      else {
        //如果提取个人信息出错
        next(null,{signal:0});
      }
    })

  }
  else {//有镜像 说明这个玩家之前不长的时间登陆过 断连后返回
    //延长原有镜像的寿命
    player.restore();
    next(null,{signal:1});
  }

}
////event///
var onUserLeave = function (app, session, reason) {
  ///当这个玩家正在断连
  if(!session || !session.uid) {
    return;
  }

  console.log('user:');
  console.log(session.uid);
  console.log('is leaving');

  //紧急储存这个玩家的信息到服务器 防止丢失
  var player=pomelo.app.get('playerpool').getPlayerByUid(session.uid);
  console.log('check');
  console.log(player);


  userDb.savePlayerInfo(player,function(res){
    if(res.signal===1){
      //存储信息成功

    }
    else{
     //存储信息失败
      console.log('Attention: player info save failed!!!!!!');

    }
    //剔除这个player
    pomelo.app.get('playerpool').removePlayerByUid(session.uid);




  });


  //操作相应的镜像进入dissconted状态
  //暂时取消
  //pomelo.app.get('playerpool').getPlayerByUid(session.uid).disconnected();
};





///////////////





Handler.prototype.entry = function(msg, session, next) {
  //得到玩家的token
  var token=msg.token, self=this;
  //处理token
  if(!token) {
  	//没有token
  	next(null,{code: 501});
  	return;
  }
  var username;
  var uid;
  var playInfo;
  //同步处理登陆前初始化
  async.waterfall([
    //1验证token
    function(cb) {
         //检查token是否合法
         tokenService.checkToken(token,function(res) {
            cb(null,res);
         });
         console.log(1);

    },
    //2根据token验证结果处理授权
    function(res, cb)
    {
        console.log(2);
        console.log(res);

        //检查token验证是否成功
        if(res.result===-1) {
          //token验证没有通过
          next(null, {code:500});
          return;

        }
        else if(res.result==0) {
          //token验证通过 did登陆
          userDb.loginByDid(res.did, function(res) {
            cb(null,res);
          });
        }
        else {
          //token验证通过 username password登陆
          userDb.loginByUsername(res.username, res.password, function(res){
            cb(null,res);
          });
        }


    },
    //3根据身份验证结果 得到user信息
    function(res,cb)
    {
        console.log(3);
        console.log(res);
        if (res.signal==1) {
          //说明用户身份验证成功
          uid=res.uid;
          userDb.getPlayerInfoByUid(uid, function(res) {
              //返还用户信息
              cb(null,res);
            

          });
        }
        else {
          //说明用户身份验证失败 终止
          next(null, {code:500});
          return;
        }
    },
    //4根据信息 配置session
    function(res, cb)
    {
      console.log(4);
      console.log(res);
      if(res) {
        //说明获得用户信息成功
        //获得玩家的信息
         playerInfo=res;
      }
      else {
        //说明获得用户信息失败
        next(null, {code:500});
        return;
      }
      
      //更新离线的session
      self.app.get('sessionService').kick(uid, cb);
    },
    //5绑定新的session
    function(cb) {
      console.log(5);
      if(uid) {
      session.bind(uid, cb);
      }
    }, 
    //6设置新的sessioni信息
    function(cb) {
      console.log(6);
      if(!playerInfo || playerInfo.length === 0) {
        next(null, {code: 500});
        return;
      }
      


      session.set('username', username);
      session.set('gold', playerInfo[0].gold);
      session.set('diamond', playerInfo[0].diamond);
      session.on('closed', onUserLeave.bind(null, self.app));
      session.pushAll(cb);
    }
    ],function(err) {
    if(err) {
      next(err, {code: 500});
      return;
    }

    next(null, {code: 100, playerInfo:playerInfo[0]});
  })

};
/*var onUserLeave = function (app, session, reason) {
  //用于用户退出后处理
  if(!session || !session.uid) {
    return;
  }

  console.log('1 ~ OnUserLeave is running ...');
  app.rpc.area.playerRemote.playerLeave(session, {playerId: session.get('playerId'), instanceId: session.get('instanceId')}, function(err){
    if(!!err){
      logger.error('user leave error! %j', err);
    }
  });
  //app.rpc.chat.chatRemote.kick(session, session.uid, null);
};*/







/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};

//////////////////
//ai_config=require('../../../../config/game_config/ai.json');
var bulletBase=require('../../../../config/gameConfig/bullet.json');
/*var e_creature_config=require('../../../../config/gameConfig/e_creature.json');
var f_creature_config=require('../../../../config/gameConfig/f_creature.json');
var item_config=require('../../../../config/gameConfig/item.json');
var object_config=require('../../../../config/gameConfig/object.json');
var scene_config=require('../../../../config/gameConfig/scene.json');
var skill_config=require('../../../../config/gameConfig/skill.json');*/


//读取配置信息 在正式连接前下载游戏的配置信息
Handler.prototype.loadConfig = function (msg, session, next) {

	//得到配置文件
    var gameConfig="cwnlcijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
    //返回配置文件
    next(null,{code:100,config:gameConfig,bullet:bulletBase});

}





