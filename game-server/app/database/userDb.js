//得到底层
var async = require('async');
var pomelo = require('pomelo');
var acc = require('../acc/supportFunction');



var userDb = module.exports;


//用户名 did绑定
userDb.BindUsernameToDid = function (username,password,did,cb) {
	var sql = 'update User set username=?, password=? where id= ? ';
	var args = [username,password,did];

	pomelo.app.get('dbclient').query(sql, args, function(err , res) {
		if(err !== null) {
			//当查询出现错误
			cb({signal:-1});
		} 
		else {
			if (!res||res.length<=0) {

				//说明根本没有这个用户
				cb({signal:-1});
			} 
			else {
				
				//操作完成 成功
				cb({signal:1});
			}
		}
	}
	)

}



//用户名 密码 进行登陆
userDb.loginByUsername = function (username, password, cb) {
	var sql = 'select * from User where username = ?';
	var args = [username];//用户的user id

	pomelo.app.get('dbclient').query(sql, args, function(err , res) {
		
		if(err !== null) {
			//当查询出现错误
			cb({signal:-1});
		} 
		else {
			if (!res||res.length<=0) {

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
			//返回的数据存在并且内容大于0
			if (!res||res.length<=0) {
				//查询失败
				cb({signal:0});
				
			} 
			else {

				console.log(100010);
				console.log(res);
				console.log(res.length);
				cb({signal:1, uid:res[0].uid});  
			}
		}
	});
};

////注册////
userDb.registerByDid = function (_did, callback) {
	var did=_did;
	var sql, args, code, uid;
	async.waterfall([
			//1检查did是否合法
			function(cb) {
				//是否有重复did
				sql = 'select * from  User where did = ?';
  				args = [did];
  				 pomelo.app.get('dbclient').query(sql,args,function(err, res) {

  				 	if(err !== null) {
  				 		cb(null,false);
  				 		return;
  				 	}
  				 	if(!res||res.length<=0) {
  				 		//说明没有这个用户 当前did没有注册
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
					console.log(res);
  				 	console.log(res.length);

  				 		if(err!==null) {
  				 			cb(null,false);
  				 			code:500;
  				 			return;
  				 		}
  				 		else {
  				 			//说明注册成功
  				 			cb(null,true);
  				 			code=101;//说明单项操作成功
  				 			uid=res.insertId;
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
				//更新当前条的uid
				basic_info="{'level':1,'rank':1,'exp':10,'avatarId':1,'playerName':'shihaoxuan'}";
				sql = 'insert into PlayerInfo ( uid, gold, diamond,basicInfo,inventoryItems,heroOwned,mercenaryOwned ) values (?, ?, ?,?,?,?,?)';
				args = [uid, 10000, 10000,basic_info,"[]","[]","[]"];
				//////////////////////
				pomelo.app.get('dbclient').query(sql,args,function(err, res) {
				      	if(err!==null) {
						//更新错误
							cb(null,false);
							code=500;
						}
						else
						{
							//更新正常
							cb(null,true)
							code=100;
						}
			    })
			}

		},
		function(res, cb) {
			cb(null,true);
		}],
		function(err) {
   		 if(err) {
      		next(err, {code: 500});
     		 return;
   		 }
    	//next(null, {code: code});
    	callback({code:code,did:did,uid:uid});
    	//根据code来得到是否注册的结果
 	 });
}
userDb.registerByUsername = function (username, password, did, email, cb) {
	var sql, args, code, uid;
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
  				 	if(!res||res.length<=0) {
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
  				 		if(err!==null) {
  				 			cb(null,res);
  				 			code:500;
  				 			return;
  				 		}
  				 		else {
  				 			//说明注册成功
  				 			cb(null,res);
  				 			code=101;
  				 			uid=res.insertId;
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
				//添加成功
				
				//更新当前条的uid
				basic_info="{'level':1,'rank':1,'exp':10,'avatarId':1,'playerName':'shihaoxuan'}";

				sql = 'insert into PlayerInfo ( uid, gold, diamond,basicInfo) values (?, ?, ?,?)';
				args = [uid, 10000, 10000,basic_info];
				//////////////////////
				pomelo.app.get('dbclient').query(sql,args,function(err, res) {
				      	if(err!==null) {
						//更新错误
							cb(null,false);
							code=500;
						}
						else
						{
							//更新正常
							cb(null,true)
							code=100;
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



///////////个人信息获取///////
userDb.getPlayerInfoByUid = function (uid, cb)
{
	var sql = 'select * from  PlayerInfo where uid = ?';
	var args = [uid];//用户的user id

	pomelo.app.get('dbclient').query(sql, args, function(err , res) {
		console.log(res);
		console.log(res.length);
		if(err !== null) {
			cb(null);
		} 
		else {
			if(!res||res.length<=0) {
				//返回失败
				cb(null);
			}
			else {	
				//返回成功
				cb(res);
			}
		}
	})
}
///////////个人信息储存////////
userDb.savePlayerInfo = function(player,cb)
{
	//整理信息
	//1basicInfo
	var basicInfoJson={level:1,rank:player.rank,exp:player.exp,avatarId:player.avatarId,playerName:player.playerName};
	

	var basicInfo=acc.jsonToString(basicInfoJson);
	//2inventoryitems 
	//转化为String
	var inventoryItems=acc.jsonToString(player.inventoryItems);
	//3shopitems数据
	var shopItems=acc.jsonToString(player.shopItems);

	//4heroOwned
	// 转化为String
	var heroOwned=acc.jsonToString(player.heroOwned);
	//5mercenaryowned
	// 转化为String
	var mercenaryOwned=acc.jsonToString(player.mercenaryOwned);


	//这里我们需要紧急储存这个palyer的信息
	var sql = 'update PlayerInfo set gold=?, diamond=?,basicInfo=?,inventoryItems=?,shopItems=?,heroOwned=?,mercenaryOwned=? where uid= ? ';
	var args = [player.gold,player.diamond,basicInfo,inventoryItems,shopItems,heroOwned,mercenaryOwned,player.uid];

	pomelo.app.get('dbclient').query(sql, args, function(err , res) {
		if(err !== null) {
			//当查询出现错误
			cb({signal:-1});
		} 
		else {
			if (!res||res.length<=0) {

				//说明根本没有这个用户
				cb({signal:-1});
			} 
			else {
				
				//操作完成 成功
				cb({signal:1});
			}
		}
	}
	)

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

