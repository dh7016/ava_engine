var supportFunction = module.exports;



//string转化为json
supportFunction.stringToJson = function(_str) {
	if(_str===""){
		return "";
	}
	else {
		return eval("(" + _str + ")");
	}
}
 //json转化为string
 supportFunction.jsonToString = function(_json) {
 	return JSON.stringify(_json); 
 }