//得到底层
var pomelo = require('pomelo');



var userDb = module.exports;


//用户名 密码 进行登陆
userDb.loginByUsername = function (username, password, cb) {
	var sql = 'select * from	User where name = ?';
	var args = [username];//用户的user id

	pomelo.app.get('dbclient').query(sql,args,function(err, res) {
		var signal;
		if(err !== null) {
			//当查询出现错误
			signal=0;
		} 
		else {
			//查询正常
			var pw;
			if (!!res) {

				//得到目标password
				var pw = res[2];
				//进行验证
				
				if(password===pw) {
					//密码相符
					signal=1;//准许通过
				}
				else {
					//密码不相符
					signal=2;//不准许通过 因为密码不相符
				}
			} 
			else {
				//说明根本没有这个用户
				signal=3;//不准许通过 因为用户不存在

			}
		}
		//对回调函数进行操作 根据processcode处理结果
		cb(signal);
	});
};
//设备id进行登陆
userDb.loginByDid = function (Did, cb) {
	var sql = 'select * from	User where did = ?';
	var args = [Did];//用户的设备id

	pomelo.app.get('dbclient').query(sql,args,function(err, res) {
		var signal;
		if(err !== null) {
			//当查询出现错误
			signal=0;
		} 
		else {
			//查询正常
			if (!!res) {
				signal=1;//有此设备号 所以准许登陆
			} 
			else {
				//说明根本没有这个用户
				signal=3;//不准许通过 因为设备号不存在   
			}
		}
		//对回调函数进行操作 根据processcode处理结果
		cb(signal);
	});
};
//尝试注册







/////////////////////////////


