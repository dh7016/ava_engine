///同步///
var async = require('async');
var tokenService = require('../../../services/tokenService');
var userDb = require('../../../database/userDb');
//var logger = require('pomelo-logger').getLogger(__filename);

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
var onUserLeave = function (app, session, reason) {
  //用于用户退出后处理
  if(!session || !session.uid) {
    return;
  }

  console.log('1 ~ OnUserLeave is running ...');
  /*app.rpc.area.playerRemote.playerLeave(session, {playerId: session.get('playerId'), instanceId: session.get('instanceId')}, function(err){
    if(!!err){
      logger.error('user leave error! %j', err);
    }
  });
  //app.rpc.chat.chatRemote.kick(session, session.uid, null);*/
};







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
//读取配置信息 在正式连接前下载游戏的配置信息
Handler.prototype.loadConfig = function (msg, session, next) {

	//得到配置文件
    var gameConfig="cwnlcijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";

    //返回配置文件
    next(null,{code:100,config:gameConfig});

}