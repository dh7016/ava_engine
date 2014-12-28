//得到底层
var async = require('async');
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
			if (!res[0]) {
				cb({signal:0});
				
			} 
			else {

				console.log(100010);
				console.log(res);
				console.log(res.length);
				cb({signal:1, uid:res[0].id});  
			}
		}
	});
};

////注册////
userDb.registerByDid = function (did, cb) {
	console.log("we got here");
	var sql, args, code;
	async.waterfall([
			//1检查did是否合法
			function(cb) {
				//是否有重复did
				sql = 'select * from  User where did = ?';
  				args = [did];

  				 pomelo.app.get('dbclient').query(sql,args,function(err, res) {
  				 	if(err) {
  				 		cb(null,false);
  				 		return;
  				 	}
  				 	if(!res[0]) {
  				 		//说明当前did没有注册
  				 		cb(null,true);
  				 	}
  				 	else {
  				 		//说明当前did已经注册
  				 		cb(null,false)
  				 	}
  				 })

			},
			//2尝试插入did
			function(res, cb) {
				if(res) {
					//说明可以注册did
					sql = 'insert into User ( uid, did ) values (null, ?)';
					args = [did];
					pomelo.app.get('dbclient').query(sql,args,function(err, res) {
  				 		if(err) {
  				 			cb(null,false);
  				 			code:500;
  				 			console.log("way1");
  				 			return;
  				 		}
  				 		if(!!res) {
  				 			//说明注册成功
  				 			cb(null,true);
  				 			code=100;
  				 			console.log("way2");
  				 		}
  				 		else {
  				 			//说明注册失败
  				 			cb(null,false);
  				 			code=500;
  				 			console.log("way3");
  				 		}
  					 })


				}
				else {
					code=500;
					cb(null,false);
				}
			},
			//3更新player info表
		function(res, cb) {
			if(!res) {
				//添加失败
				code=500;
				return;
			}
			else {
				//添加成功
				//进一步更新uid 
				var uid=res.insertId;
				//更新当前条的uid
				sql = 'insert into PlayerInfo ( uid, gold, diamond ) values (?, ?, ?)';
				args = [uid, 10000, 10000];
				//////////////////////
				pomelo.app.get('dbclient').query(sql,args,function(err, res) {
				      	if(err) {
						//更新错误
							cb(null,false);
							code=500;
						}
						else
						{
							//更新正常
							if (res[0]) {
							cb(null,true)
							code=100;
							} 
							else {
							//说明更新不正常
							cb(null,false);
							code=500;
							}
						}
			    })
			}

		}],
		function(err) {
   		 if(err) {
      		next(err, {code: 500});
     		 return;
   		 }

    	//next(null, {code: code});
    	cb({code:code});
    	//根据code来得到是否注册的结果
 	 })
}
userDb.registerByUsername = function (username, password, did, email, cb) {
	var sql, args, code;
	async.waterfall([
		//1检查是否有用户名重复
		function(cb) {
			sql = 'select * from  User where username = ?';
  			args = [username];
  			 pomelo.app.get('dbclient').query(sql,args,function(err, res) {
  				 	if(err) {
  				 		cb(null,false);
  				 		return;
  				 	}
  				 	if(!res[0]) {
  				 		//说明当前did没有注册
  				 		cb(null,true);
  				 	}
  				 	else {
  				 		//说明当前did已经注册
  				 		cb(null,false)
  				 	}
  				 })

		},			
		//2尝试插入username 和 password did
		function(res, cb) {
			if(res) {
					//说明可以注册did
					sql = 'insert into User (uid, username, password, did, email) values (null, ?, ?, ?, ?)';
					args = [username, password, did, email];
					pomelo.app.get('dbclient').query(sql,args,function(err, res) {
  				 		if(err) {
  				 			cb(null,res);
  				 			code:500;
  				 			return;
  				 		}
  				 		if(!res[0]) {
  				 			//说明注册成功
  				 			cb(null,res);
  				 			code=100;
  				 		}
  				 		else {
  				 			//说明注册失败
  				 			cb(null,res);
  				 			code=500;
  				 		}
  					 })


				}
			else {
				cb(null,false);
				code=500;
				return;
			}
		},
		//3更新uid
		function(res, cb) {
			if(!res) {
				//添加失败
				code=500;
				return;
			}
			else {
				//添加成功
				//进一步更新uid 
				var uid=res.insertId;
				//更新当前条的uid
				sql = 'update User set uid=?  where uid=?';
				args = [uid, uid];
				//////////////////////
				pomelo.app.get('dbclient').query(sql,args,function(err, res) {
				      	if(err) {
						//更新错误
							cb(null,false);
							code=500;
						}
						else
						{
							//更新正常
							if (res[0]) {
							cb(null,true)
							code=100;
							} 
							else {
							//说明更新不正常
							cb(null,false);
							code=500;
							}
						}
			    })
			}

		}],function(err) {
   		 if(err) {
      		next(err, {code: 500});
     		 return;
   		 }

    	next({code: code});
    	//code决定注册是否成功
 	 })

}

////////////////



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

