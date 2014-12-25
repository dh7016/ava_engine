var tokenService = module.exports;







//根据uid创建一个token
tokenService.createToken = function(username, password, did) {

	var token;
	var str;
	if(did===0) {
		//did等于0表示用户使用uid 和 password 创建token
		//uid就是一个数字 我们暂时用简单的加密方法 uid +当前时间 密码的和 乘以0.5 
		//1创建密码
		str=username+'#'+Date.now().toString()+'#'+password;

	}
	else {
		//did不等于0 表示使用did模式创立token  格式两个did在头尾
		//1创建密码
		str="did#"+Date.now().toString()+'#'+did;
	}
	console.log(str);


	//2转换ascii
	token=tokenEncode(str).toString();
	console.log(token);

	return token;

}
tokenService.test = function () {
    console.log(1);
}

//检测是否合法过期
tokenService.checkToken = function(token, cb) {
	//还原token 得到 日期  以及合法性
	//1解析token
	var token_str =String(tokenDecode(token));

	//2分割 得到uid 日期 和 密码
	var token_split = token_str.split("#");
	var arg1 = token_split[0];
	var arg2 = parseInt(token_split[1]);//这个是时间
	var arg3 = token_split[2];
	//3检查是否过期 如果没过期 
	
	if(Date.now()-arg2>=100000) {
		//说明过期
		cb({result:-1});
		return;
	}



	if(arg1===arg3) {
		//说明是设备号登陆
		//返回did

		cb({result:0, did:arg3});
	}
	else {
		//说明是用户名 密码登陆
		//返回username password
		cb({result:1, username:arg1, password:arg3});
	}
}



var tokenEncode = function(password) {
	//把密码从字符变为数字
	var pw_str=String(password);
    var length=pw_str.length;
    var pw_result_number
    for(var tra=0; tra<length;tra++){
    	//把password转换成ascii数字

    	pw_result_number+=parseInt(pw_str.charCodeAt(tra))*Math.pow(10,(length-tra-1));

    }

    return pw_result_number;
}
var tokenDecode = function(password) {
	//把密码从数字变为字符
	var pw_str=password.toString();
	var length=pw_str.length;
	var pw_result_str;
	for(var tra=0;tra<length;tra++) {
		//把password还原
		pw_result_str+=String.fromCharCode(parseInt(pw_str.charAt(tra)));
	}

    return pw_result_str;
}
