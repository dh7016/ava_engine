var generalService = module.exports;

//这个存储着许多通用的服务


//得到服务器时间
var date=new Date();
generalService.getServerTime = function() {
 	//返还日期
 	return date.getFullYear()+"#"+date.getMonth()+"#"+date.getDate()+"#"+date.getHours()+"#"+date.getMinutes()+"#"+date.getSeconds();
}


