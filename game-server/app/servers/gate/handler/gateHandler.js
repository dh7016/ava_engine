module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};



//接入gate
 Handler.prototype.gateConnect = function(msg,session,next) {
 	//1检查名字 密码是否合格
 	var uid=msg.uid;
 	var password=msg.password;
    if(!uid) {
     	next(null,{ code: 500 
     	});
     	return;
    }
    if(!password) {
    	next(null,{ code: 500
    	});
    	return;
    }
    //测试
    next(null,{info : 'success'});

    //2确认合格 分配一个合适的login server 并且返还给客户端 ip 和 clientport
    /*var logins = this.app.getServersByType('login');
	if(!logins || logins.length === 0) {
		next(null, {code: 501});
		return;
	}

	var login = dispatcher.dispatch(uid, logins);
	next(null, {code: 100, host: login.host, port: login.clientPort});
    */
 };