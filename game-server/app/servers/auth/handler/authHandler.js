//得到用户验证方法
var userDb = require('../../../database/userDb');
var dispatcher = require('../../../../util/dispatcher');
var tokenService = require('../../../services/tokenService');


module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

//did注册
Handler.prototype.registerByDid = function(msg,session,next) {

	this.app.rpc.auth.authRemote.registerByDid(msg.did, function(res) {
		if(!!res) {
		next(null,res);//res 内包含code
		}
	});
}
//username password 注册
Handler.prototype.registerByUsername = function(msg,session,next) {
	this.app.rpc.auth.authRemote.registerByUsername(msg.username, msg.password, msg.did, msg.email,function(res) {
		if(!!res) {
		next(null,res);//res 内包含code
		}
	});
}

//登陆
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
				token=tokenService.createToken(0, 0, did);
		
			}
			else {
				//登陆失败
				// 尝试注册这个did
				this.app.rpc.auth.authRemote.registerByDid(session, did,function(res) {
					if(!res) {
						//如果没有返回结果 说明失败
						next(null,{code:500});
						return;
					}
					else {
						if(res.code==100) {
							//说明注册did成功 通知客户端重新登陆
							next(null,{code:101});
						}
						else {
							//说明注册失败
							next(null,{code:500});
							return;
						}

					}
				});


				
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
				token = tokenService.createToken(username, password, 0);
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

