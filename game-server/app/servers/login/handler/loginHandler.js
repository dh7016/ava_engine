//得到用户验证方法
var userDb = require('../../../database/userDb');


module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



Handler.prototype.loginConnect = function(msg,session,next) {
	//根据用户的登陆方式来进行登陆验证
	var login_type=msg.login_type;
	if(login_type) {
		//使用device id登陆
		var Did=msg.Did;
		userDb.loginByDid(Did,function(didSignal) {
			//得到 并且返回登陆的结果signal给客户端
			next(null,{signal : didSignal});
		})
	}
	else {
		//使用username 和 password 登陆
		var username=msg.username;
		var password=msg.password;
		userDb.loginByUsername(username,password,function(usernameSignal) {
			//得到 并且返回登陆的结果signal给客户端
			next(null,{signal : usernameSignal});
		})

	}

};