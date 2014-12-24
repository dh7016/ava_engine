//得到用户验证方法
var userDb = require('../../../database/userDb');
var tokenService = ('../../../service/tokenService');
var dispatcher = require('../../../../util/dispatcher');


module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



Handler.prototype.loginConnect = function(msg,session,next) {
	//得到当前正在运行的connector服务器
	var did;// 设备id
	var username;
	var password;
	var c_host;
	var c_port;
	var login_type=msg.login_type;
	var token;
	var connector;

	var connectors = this.app.getServersByType('connector');
	if(!connectors || connectors.length === 0) {
		next(null, {code: 500});
		return;
	}
	//得到connector服务器信息
	connector = dispatcher.dispatch(connectors)
	c_host = connector.host;
	c_port = connector.clientPort;


	console.log(msg.did);
	console.log(login_type);

	//2根据用户的登陆方式来进行登陆验证
	
	if(login_type) {
		//使用device id登陆
		did=msg.did;
		console.log(did);
		userDb.loginByDid(did,function(res) {
			//根据结果来判断是否要给予token
			if(res.signal===1) {
				//登陆成功
				//获得token
				//token=tokenService.createToken("0", "0", did);
				token="sssvdvsrv";
				tokenService.test();
			}
			else {
				//登陆失败
				next(null,{code:500});
				return;
			}


			//得到 并且返回登陆的结果signal给客户端
			next(null,{code:100, token:token, host:c_host, port:c_port});
		})
	}
	else {
		//使用username 和 password 登陆
		username = msg.username;
		password = msg.password;
		userDb.loginByUsername(username, password, function(res) {
			if (res.signal===1) {
				//登陆成功
				//获得token
				token = tokenService.createToken(username, password, "0");
			}
			else {
				//登陆失败
				next(null, {code: 500});
				return;
			}

			//得到 并且返回登陆的结果signal给客户端
			next(null, {code: 100, token: token, host: c_host, port: c_port});


		})
	}
}

