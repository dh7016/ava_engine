var dispatcher = require('../../../../util/dispatcher');
var code = require('../../../../acc/code');



module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



//接入gate

 Handler.prototype.gateConnect = function(msg,session,next) {
  

 	//1检查identity 是否合格
 	var identity=msg.identity;
  if(!identity||identity!=="ava") {
    next(null,{code:500}); 
    return;
  }
   

  //2确认合格 分配一个合适的login server 并且返还给客户端 ip 和 clientport
 var auths = this.app.getServersByType('auth');
	if(!auths || auths.length === 0) {
		next(null, {code: 500});
		return;
	}

	var login = dispatcher.dispatch(auths);
	next(null, {code: 100, host: login.host, port: login.clientPort});
 };
 

//得到用户验证方法
//var userDb = require('../../../database/userDb');

 /*Handler.prototype.test = function (msg,session,next)
 {
    next(null,{info : 'success'});
    console.log("identity");

 }*/

 /*Handler.prototype.sql_test = function(msg, session ,next)
 {
    var uid=msg.uid;
    userDb.test(uid,function(info){
      next(null,{sql:info});
    })

 }*/