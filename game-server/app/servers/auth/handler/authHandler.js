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
	var did=msg.did;
	this.app.rpc.auth.authRemote.registerByDid(session,did, function(res) {
		if(!!res) {
		   next(null,res);//res 内包含code
		}
		else{
			next(null,{code:500});
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
//验证 用户信息 通过用户名和密码来验证
Handler.prototype.authByUsername = function(msg,session,next) {

	var username=msg.username;
	var password=msg.password;


	//验证username 和 password是否合法
	userDb.loginByUsername(username,password,function(res){

		//1验证成功 
		if(res.signal==1) {
			//的到一个connector服务器的ip 和port
			var connectors = this.app.getServersByType('connector');
			if(!connectors || connectors.length === 0) {
				//说明当前没有正在服务的connector
				next(null, {signal:-1});
				return;
			}

			var connector = dispatcher.dispatch(connectors);
			//验证成功！！！
			next(null,{signal:1,username:username,password:password,host: connector.host,port: connector.clientPort});
		}
		//2验证失败
		else{
			next(null,{signal:0});
		}
	}	
	)
}
//验证 使用did验证用户身份
Handler.prototype.authByDid = function(msg,session,next)
{
	var did=msg.did;
	//的到一个connector服务器的ip 和port
	var connectors = this.app.getServersByType('connector');

	userDb.loginByDid(did,function(res){

		if(res.signal==1)//验证成功
		{
			
			
			if(!connectors || connectors.length === 0) {
				//说明当前没有正在服务的connector
				next(null, {signal:-1});
				return;
			}

			var connector = dispatcher.dispatch(connectors);
			//验证成功！！！
			next(null,{signal:1,did:did,host: connector.host,port: connector.clientPort});
		}
		else//验证失败
		{
			next(null,{signal:0});
		}



	})



}




//绑定 设备号和用户名绑定 把username和did绑定
Handler.prototype.BindUsernameToDid = function(msg,session,next) {

	var username=msg.username;
	var password=msg.password;
	var did=msg.did;


	//尝试绑定
	userDb.BindUsernameToDid(username,password,function(res){

		//1绑定成功 返还成功的username 
		if(res.signal==1) {
			next(null,{signal:1,username:username});
		}
		//2绑定失败
		else{
			next(null,{signal:0});
		}
	}	
	)
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
	var self=this;

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
		userDb.loginByDid(did,function(res) {
			//根据结果来判断是否要给予token
			if(res.signal===1) {
				//登陆成功
				//获得token
				token=tokenService.createToken(0, 0, did);
				//得到 并且返回登陆的结果signal给客户端
				next(null,{code:100, token:token, host:c_host, port:c_port});
		
			}
			else {
				//登陆失败
				// 尝试注册这个did
				self.app.rpc.auth.authRemote.registerByDid(session, did, function(res) {
					console.log("rpc here");
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

