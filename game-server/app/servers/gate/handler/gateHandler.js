//var dispatcher = require('../../../../util/dispatcher');
//var code = require('../../../../acc/code');

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



//接入gate
/*
 Handler.prototype.gateConnect = function(msg,session,next) {
 	//1检查名字 密码是否合格
 	var username=msg.username;
 	var password=msg.password;
    if(!username) {
     	next(null,{ code: 500 
     	});
     	return;
    }
    if(!password) {
    	next(null,{ code: 500
    	});
    	return;
    }
   

  //2确认合格 分配一个合适的login server 并且返还给客户端 ip 和 clientport
 var logins = this.app.getServersByType('login');
	if(!logins || logins.length === 0) {
		next(null, {code: 500});
		return;
	}

	var login = dispatcher.dispatch(logins);
	next(null, {code: 100, host: login.host, port: login.clientPort});
    
 };
 */

//得到用户验证方法
//var userDb = require('../../../database/userDb');

 Handler.prototype.test = function (msg,session,next)
 {
    next(null,{info : 'success'});
 }

 /*Handler.prototype.sql_test = function(msg, session ,next)
 {
    var uid=msg.uid;
    userDb.test(uid,function(info){
      next(null,{sql:info});
    })

 }*/