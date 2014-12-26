//得到底层
var pomelo = require('pomelo');



var userDb = module.exports;


//用户名 密码 进行登陆
userDb.loginByUsername = function (username, password, cb) {
	var sql = 'select * from	User where name = ?';
	var args = [username];//用户的user id

	pomelo.app.get('dbclient').query(sql, args, function(err , res) {
		
		if(err !== null) {
			//当查询出现错误
			cb({signal:-1});
		} 
		else {
			
			if (!res) {

				//说明根本没有这个用户
				cb({signal:-1});
			} 
			else {
				
				//查询正常
				var pw;

				//得到目标password
				pw = res[0].password;
				//进行验证
				
				if(password===pw) {
					//密码相符
					cb({signal:1, uid:res[0].uid});
				}
				else {
					//密码不相符
					cb({signal:0});
				}
			}
		}
	});
};
//设备id进行登陆
userDb.loginByDid = function (Did, cb) {
	var sql = 'select * from User where did = ?';
	var args = [Did];//用户的设备id

	pomelo.app.get('dbclient').query(sql,args,function(err, res) {
		if(err !== null) {
			//当查询出现错误
			cb({signal:-1});
		} 
		else {
			//查询正常
			if (!res) {
				cb({signal:0});
				
			} 
			else {
				console.log(res);
				cb({signal:1, uid:res[0].uid});  
			}
		}
	});
};
//尝试注册
userDb.tryToRegister = function (username, password, did, cb) {
   //1检查username是重复
   var sql = 'select * from	User where username = ?';
   var args = [username];

   pomelo.app.get('dbclient').query(sql,args,function(err, res) {
		
		if(err !== null) {
			//当查询出现错误
			cb({code : 500});
		} 
		else {
			//查询正常
			if (!!res) {
				//有此用户名 所以不允许注册
				cb({code : 501});
			} 
			else {
				//说明根本没有这个用户 执行注册
				var rsql = "insert into User ('username', 'password', 'did') values (?, ?, ?)";
				var rargs = [username, password, did];

				pomelo.app.get('dbclient').query(sql,args,function(err, ires) {
					if(err !== null) {
					//插入错误
					cb({code : 500});
				}
				else {
					if(!!ires) {
						//查询正常 得到id 根据id计算出uid
						var uid=0+ires[0].insertId;
						//更新当前条的uid
						var usql = 'update t_user set uid=?  where username=?';
						var uargs = [uid, username];
						//////////////////////
						pomelo.app.get('dbclient').query(sql,args,function(err, ures) {
					      	if(err !== null) {
							//更新错误
							cb({code : 500});
						}
						else
						{
							//更新正常
							if (!!ures) {
							cb({code : 100});

							} 
							else {
							//说明更新不正常
							cb({code : 500});

							}
						}

					    })
					    /////////////////

					}
					else {
						//查询不正常
						cb({code : 500});
					}
				}



				});





				 
			}
		}
		
	});




}



//尝试得到player info
userDb.getPlayerInfoByUid = function (uid, cb)
{
	var sql = 'select * from  PlayerInfo where uid = ?';
	var args = [uid];//用户的user id

	pomelo.app.get('dbclient').query(sql, args, function(err , res) {
		if(err !== null) {
			cb(null);
		} 
		else {
			cb(res);
		}
	})
}







/////////////////////////////
/////test
userDb.test = function (uid , cb){
	var sql = 'select * from  Auth	 where uid = ?';
	var args = [uid];//用户的设备id

	pomelo.app.get('dbclient').query(sql,args,function(err, res) {

		//返还一个结果
		cb(res[0].password);


	});


}

